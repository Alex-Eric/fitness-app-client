import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";
import { Button, Spinner } from "react-bootstrap";
import ExerciseDetail from "./ExerciseDetail";
import ExerciseForm from "../components/ExerciseForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Login from "./Login";

function Exercises() {
  const [exercises, setExercises] = useState(null);
  const [id, setId] = useState("");

  //Display components variables
  const [displayExercise, setDisplayExercise] = useState(false);
  const [displayCreateExercise, setDisplayCreateExercise] = useState(false);

  //Form states varaibles
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext);


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
  useEffect(() => {
    getAllExercises();
  }, [id, displayCreateExercise]);
  return (
    <>
      <Button
      style={{"margin":"20px"}}
        variant="danger"
        onClick={() => {
          displayCreateExercise
            ? setDisplayCreateExercise(false)
            : setDisplayCreateExercise(true);
        }}
      >
        {displayCreateExercise ? "Back" : "Create an exercise!"}
      </Button>
      <br />
      {displayCreateExercise && (
        <>
          <br />
          {isLoggedIn ? <ExerciseForm
        name={name}
        setNameCallback={setName}
        type={type}
        setTypeCallback={setType}
        description={description}
        setDescriptionCallback={setDescription}
        validated={validated}
        setValidatedCallback={setValidated}
        navigate={navigate}
        buttonName={"Create"}
        submit={"create"}
        setDisplayCreateExerciseCallback={setDisplayCreateExercise}
      />: <Login />}
          
          <br />
        </>
      )}
      {displayExercise ? (
        exercises ? (
          <div>
            <br />
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%" }}>
                {exercises
                  .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  })
                  .map((exercise) => {
                    return (
                      <ExerciseCard
                        key={exercise._id}
                        {...exercise}
                        setIdCallback={setId}
                        setDisplayExerciseCallback={setDisplayExercise}
                      />
                    );
                  })}
              </div>
              <div style={{ width: "40%", position: "fixed", right: "0px" }}>
                <Button
                  variant="danger"
                  onClick={() => setDisplayExercise(false)}
                >
                  Back
                </Button>
                <ExerciseDetail
                  id={id}
                  setDisplayExerciseCallback={setDisplayExercise}
                  setIdCallback={setId}
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
              {...exercise}
              setDisplayExerciseCallback={setDisplayExercise}
              setIdCallback={setId}
            />
          ))
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default Exercises;
