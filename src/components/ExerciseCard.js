import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ExerciseCard(props) {
  const id = props._id;
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
        <Card.Img
          variant="top"
          src="https://static.strengthlevel.com/images/illustrations/incline-hammer-curl-1000x1000.jpg"
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ExerciseCard;
