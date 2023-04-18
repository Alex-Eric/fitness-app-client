import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import MuscleGroupImage from "./MuscleGroupImage.tsx";

function ExerciseCard(props) {

  const id = props.exercises.owner;
  const user = props.users.filter(a=>a._id === id )[0]

  return (
    <Link
      onClick={() => {
        props.setIdCallback(id)
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
        {/* <Card.Img
          variant="top"
          src="https://static.strengthlevel.com/images/illustrations/incline-hammer-curl-1000x1000.jpg"
        /> */}
        <MuscleGroupImage muscleGroups={[`${props.exercises.muscle}`]} />
        <Card.Body>
          <Card.Title>{props.exercises.name}</Card.Title> <br />
          <Card.Subtitle>Created by {user.name}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ExerciseCard;
