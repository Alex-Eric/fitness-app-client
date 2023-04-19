import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import MuscleGroupImage from "./MuscleGroupImage.tsx";

function ExerciseCard(props) {
  const idExercise = props.exercises._id;
  const idOwner = props.exercises.owner;
  const user = props.users.filter((a) => a._id === idOwner)[0];

  const muscle = props.muscles.filter(
    (filter) => {
      return filter.name === props.exercises.muscle
    }
  )[0]

  return (
    <Link
      onClick={() => {
        props.setIdCallback(idExercise);
        props.setDisplayExerciseCallback(true);
      }}
    >
      <Card
        style={{
          width: "20rem",
          height: "25rem",
          padding: "20px",
          margin: "5px",
          display: "inline-block",
          overflow: "hidden",
          textDecoration: "none",
          color: "black",
        }}
      >
        <MuscleGroupImage muscleGroups={[`${muscle.photo}`]} />
        <Card.Body>
          <Card.Title>{props.exercises.name}</Card.Title> <br />
          <Card.Subtitle>Created by {user.name}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ExerciseCard;
