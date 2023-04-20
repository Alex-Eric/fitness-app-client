import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";
import { Button, Spinner } from "react-bootstrap";
import ExerciseDetail from "./ExerciseDetail";
import ExerciseForm from "../components/ExerciseForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Login from "./Login";

function Exercises(props) {
  //Initialize useNavigate
  const navigate = useNavigate();

  //Save exercises
  const [exercises, setExercises] = useState(null);

  //Display components variables
  const [displayExercise, setDisplayExercise] = useState(false);
  const [displayCreateExercise, setDisplayCreateExercise] = useState(false);

  //Form states varaibles
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [reps, setReps] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  //Save users
  const [users, setUsers] = useState("");

  //Get all users
  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_AUTH_URL}/users`)
      .then((response) => setUsers(response.data))
      .catch((err) => console.log("ERROR: ", err));
  };

  //Get all the exercises
  const getAllExercises = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  //Get the exercises only one time
  useEffect(() => {
    getAllUsers();
  }, []);

  //Get the users only one time
  useEffect(() => {
    getAllExercises();
  }, [id, displayCreateExercise]);

  return (
    <>
      {/* The button to open the create exercise form*/}
      {!displayExercise && <Button
        style={{ margin: "20px" }}
        onClick={() => {
          displayCreateExercise
            ? setDisplayCreateExercise(false)
            : setDisplayCreateExercise(true);
        }}
      >
        {/* The button name change if is the form is visible or not */}
        {displayCreateExercise ? "Cancel" : "Create an exercise!"}
      </Button>}
      

      <br />
      {displayCreateExercise && (
        <>
          <br />
          {isLoggedIn ? ( props.muscles && 
            <ExerciseForm
              name={name}
              setNameCallback={setName}
              type={type}
              setTypeCallback={setType}
              repsCallback={reps}
              setRepsCallback={setReps}
              description={description}
              setDescriptionCallback={setDescription}
              muscles={props.muscles}
              setMusclesCallback={props.setMuscleCallback}
              validated={validated}
              setValidatedCallback={setValidated}
              navigate={navigate}
              buttonName={"Create"}
              submit={"create"}
              setDisplayCreateExerciseCallback={setDisplayCreateExercise}
            />
          ) : (
            <>
            {/* IF the user it's not logged, display de login page */}
            <Login />
            </>
          )}

          <br />

        </>
      )}
      {/* Check if the exercise shows full screen, or half screen with details */}
      {displayExercise ? (
        
        (exercises && users) ? (
          <div>
            <div style={{ display: "flex" }}>
              <div className="display-exercise-half-screen">
                {exercises
                  .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  })
                  .map((exercise) => {
                    return (
                      <ExerciseCard
                        key={exercise._id}
                        exercises={exercise}
                        users={users}
                        setIdCallback={setId}
                        setDisplayExerciseCallback={setDisplayExercise}
                        muscles={props.muscles}
                      />
                    );
                  })}
              </div>
              <div className="display-exercise-details">
                <ExerciseDetail
                  id={id}
                  setDisplayExerciseCallback={setDisplayExercise}
                  setIdCallback={setId}
                  muscles={props.muscles}
                  setMusclesCallback={props.setMusclesCallback}
                />
              </div>
            </div>
          </div>
        ) : (
          <Spinner animation="border" />
        )
      ) : exercises ? (
        exercises
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exercises={exercise}
              users={users}
              setDisplayExerciseCallback={setDisplayExercise}
              setIdCallback={setId}
              muscles={props.muscles}
            />
          ))
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default Exercises;
