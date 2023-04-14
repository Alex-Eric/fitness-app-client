import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";
import { Spinner } from "react-bootstrap";

function Exercises() {
  const [exercises, setExercises] = useState(null);

  const getAllExercises = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        setExercises(response.data);
        console.log(response.data)
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
      {exercises ? (
        exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} {...exercise} />
        ))
      ) : 
        <Spinner animation="border" />
      }
    </>
  );
}
export default Exercises;
