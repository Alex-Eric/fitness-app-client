import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";
import { Button, Spinner } from "react-bootstrap";
import ExerciseDetail from "./ExerciseDetail";

function Exercises() {
  const [exercises, setExercises] = useState(null);
  const [id, setId] = useState("");
  const [displayExercise, setDisplayExercise] = useState(false);

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
  }, []);
  return (
    <>
      <h1>Exercises!</h1>
      {displayExercise ? (
        exercises ? (
          <div>
            <br />
            <div style={{ display: "flex" }}>
              <div style={{ width: "60%" }}>
                {exercises.map((exercise) => {
                  console.log(exercise);
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
              <div style={{ width: "40%" ,"position":"fixed","right":"0px"}}>
              <Button variant="danger" onClick={() => setDisplayExercise(false)}>Back</Button>
                <ExerciseDetail id={id} />
              </div>
            </div>
          </div>
        ) : (
          <Spinner animation="border" />
        )
      ) : exercises ? (
        exercises.map((exercise) => (
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
