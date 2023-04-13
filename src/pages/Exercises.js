import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";

function Exercises() {
  const [exercises, setExercises] = useState(null);
  const imageLoading = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"

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
      {exercises ? (
        exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} {...exercise} />
        ))
      ) : (
        <img
          src={imageLoading}
          alt="Loading"
        />
      )}
    </>
  );
}
export default Exercises;
