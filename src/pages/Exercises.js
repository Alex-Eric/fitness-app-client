import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";
import { Button, FloatingLabel, Spinner, Form } from "react-bootstrap";
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

  //Form states variables
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
      {!displayExercise && (
        <Button
          style={{ margin: "20px" }}
          onClick={() => {
            displayCreateExercise
              ? setDisplayCreateExercise(false)
              : setDisplayCreateExercise(true);
          }}
        >
          {displayCreateExercise ? "Cancel" : "Create an exercise!"}
        </Button>
      )}
      <br />
      {displayCreateExercise && (
        <>
          <br />

          {isLoggedIn ? (
            props.muscles && (
              <ExerciseForm
                name={name}
                setNameCallback={setName}
                type={type}
                setTypeCallback={setType}
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
            )
          ) : (
            <Login />
          )}

          <br />
        </>
      )}
      {displayExercise ? (
        exercises && users ? (
          <>
            <div>
              <div style={{ display: "flex" }}>
                <div className="display-exercise-half-screen">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Search by name"
                    className="mb-3"
                    style={{ margin: "0 25%" }}
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder=" "
                      name="name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </FloatingLabel>

                  {props.muscles.map((muscleDetail) => {
                    const filteredExercises =
                      exercises &&
                      exercises
                        .filter((filter) =>
                          filter.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .sort((a, b) => {
                          return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .filter(
                          (exercise) => exercise.muscle === muscleDetail.name
                        );
                    return (
                      <div style={{ margin: "40px 0" }}>
                        {filteredExercises && filteredExercises.length > 0 && (
                          <>
                            <h1>
                              {muscleDetail.name
                                .split("_")
                                .map(
                                  (e) => e.charAt().toUpperCase() + e.slice(1)
                                )
                                .join(" ")}
                            </h1>
                            <hr
                              style={{
                                "border-top": "10px solid grey",
                                margin: "40px 20%",
                                "border-radius": "100px",
                              }}
                            />
                            {filteredExercises &&
                            filteredExercises.length === 0 ? (
                              <h5>No exercises found....</h5>
                            ) : (
                              filteredExercises &&
                              filteredExercises.map((exercise) => (
                                <ExerciseCard
                                  key={exercise._id}
                                  exercises={exercise}
                                  users={users}
                                  setIdCallback={setId}
                                  setDisplayExerciseCallback={
                                    setDisplayExercise
                                  }
                                  muscles={props.muscles}
                                />
                              ))
                            )}
                          </>
                        )}
                      </div>
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
          </>
        ) : (
          <Spinner animation="border" />
        )
      ) : (
        props.muscles && (
          <>
            <FloatingLabel
              controlId="floatingInput"
              label="Search by name"
              className="mb-3"
              style={{ margin: "0 30%" }}
            >
              <Form.Control
                required
                type="text"
                placeholder=" "
                name="name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FloatingLabel>
            {props.muscles.map((muscleDetail) => {
              const filteredExercises =
                exercises &&
                exercises
                  .filter((filter) =>
                    filter.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  })
                  .filter((exercise) => exercise.muscle === muscleDetail.name);
              return (
                <div style={{ margin: "40px 0" }}>
                  {filteredExercises && filteredExercises.length > 0 && (
                    <>
                      <h1>
                        {muscleDetail.name
                          .split("_")
                          .map((e) => e.charAt().toUpperCase() + e.slice(1))
                          .join(" ")}
                      </h1>
                      <hr
                        style={{
                          "border-top": "10px solid grey",
                          margin: "40px 20%",
                          "border-radius": "100px",
                        }}
                      />
                      {filteredExercises && filteredExercises.length === 0 ? (
                        <h5>No exercises found....</h5>
                      ) : (
                        filteredExercises &&
                        filteredExercises.map((exercise) => (
                          <ExerciseCard
                            key={exercise._id}
                            exercises={exercise}
                            users={users}
                            setIdCallback={setId}
                            setDisplayExerciseCallback={setDisplayExercise}
                            muscles={props.muscles}
                          />
                        ))
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </>
        )
      )}
    </>
  );
}
export default Exercises;
