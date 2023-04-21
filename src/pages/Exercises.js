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
  const [muscle,setMuscle] = useState(null)
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  //Save users
  const [users, setUsers] = useState("");

  //description for each muscle exercises
  const descriptionExercise = (name) => {
    switch (name) {
      case "abdominals":
        return (
          <p>
            {" "}
            In the following exercises, you'll be able to work on your abdominal
            muscles. These muscles are located in your midsection and are
            responsible for supporting your spine and helping you maintain good
            posture.
          </p>
        );
      case "abductors":
        return (
          <p>
            These exercises will help you work on your abductor muscles, which
            are located in your hips and thighs. These muscles are responsible
            for moving your legs away from your body's midline.
          </p>
        );
      case "adductors":
        return (
          <p>
            {" "}
            In the following exercises, you'll be able to work on your adductor
            muscles, which are also located in your hips and thighs. These
            muscles are responsible for moving your legs towards your body's
            midline.
          </p>
        );
      case "biceps":
        return (
          <p>
            These exercises will help you work on your bicep muscles, which are
            located in your upper arms. These muscles are responsible for
            flexing your elbow joint and helping you lift objects towards your
            body.
          </p>
        );
      case "calves":
        return (
          <p>
            {" "}
            In the following exercises, you'll be able to work on your calf
            muscles, which are located in the lower part of your legs. These
            muscles are responsible for helping you push off the ground when
            walking or running.
          </p>
        );
      case "chest":
        return (
          <p>
            {" "}
            These exercises will help you work on your chest muscles, which are
            located in your upper body. These muscles are responsible for
            helping you push objects away from your body and assisting with
            movements like pushing and pulling.
          </p>
        );
      case "forearms":
        return (
          <p>
            {" "}
            In the following exercises, you'll be able to work on your forearm
            muscles, which are located in your lower arms. These muscles are
            responsible for helping you grip and hold objects.
          </p>
        );
      case "glutes":
        return (
          <p>
            These exercises will help you work on your glute muscles, which are
            located in your buttocks. These muscles are responsible for helping
            you stand up straight, maintaining good posture, and assisting with
            movements like walking and running.
          </p>
        );
      case "hamstrings":
        return (
          <p>
            {" "}
            In the following exercises, you'll be able to work on your hamstring
            muscles, which are located in the back of your thighs. These muscles
            are responsible for helping you bend your knee joint and assisting
            with movements like walking and running.
          </p>
        );
      case "lats":
        return (
          <p>
            These exercises will help you work on your latissimus dorsi muscles,
            which are located in your back. These muscles are responsible for
            helping you pull your arms towards your body and assisting with
            movements like pulling and rowing.
          </p>
        );
      case "lower_back":
        return (
          <p>
            In the following exercises, you'll be able to work on your lower
            back muscles, which are located in the lower part of your back.
            These muscles are responsible for supporting your spine and helping
            you maintain good posture.
          </p>
        );
      case "middle_back":
        return (
          <p>
            These exercises will help you work on your middle back muscles,
            which are located in the middle part of your back. These muscles are
            responsible for helping you maintain good posture and assisting with
            movements like pulling and rowing.
          </p>
        );
      case "neck":
        return (
          <p>
            These exercises will help you work on your bicep muscles, which are
            located in your upper arms. These muscles are responsible for
            flexing your elbow joint and helping you lift objects towards your
            body.
          </p>
        );

      case "quadriceps":
        return (
          <p>
            These exercises will help you work on your quadriceps muscles, which
            are located in the front of your thighs. These muscles are
            responsible for helping you straighten your knee joint and assisting
            with movements like walking and running.
          </p>
        );
      case "traps":
        return (
          <p>
            In the following exercises, you'll be able to work on your trapezius
            muscles, which are located in your upper back and neck. These
            muscles are responsible for helping you move your shoulders and neck
            and assisting with movements like shrugging.
          </p>
        );
      case "triceps":
        return (
          <p>
            {" "}
            These exercises will help you work on your tricep muscles, which are
            located in your upper arms. These muscles are responsible for
            extending your elbow joint and assisting with movements like pushing
            and pulling.
          </p>
        );
      default:
        <p></p>;
        break;
    }
  };

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
  }, [id, displayCreateExercise,displayExercise]);

  return (
    <>
    <br />
    <h1>Exercises</h1>
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
                muscle={muscle}
                setMuscleCallback={setMuscle}
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
                            {descriptionExercise(muscleDetail.name)}
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
                    setDisplayCreateExerciseCallback={setDisplayCreateExercise}
                    setIdCallback={setId}
                    muscle={muscle}
                    setMuscleCallback={setMuscle}
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
                      {descriptionExercise(muscleDetail.name)}
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
