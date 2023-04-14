import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const getExercise = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises/${id}` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  useEffect(() => {
    getExercise();
  }, [id]);


  return (
    <>
      {exercise ? (
        <>
          <h1>{exercise.name}</h1>
          <h3>Type: {exercise.type.split("_").map(e=>e.charAt().toUpperCase()+e.slice(1)).join(" ")}</h3>
          <p style={{margin:"20px 20%","line-height":"1.5"}}>{exercise.description}</p>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default ExerciseDetail;
