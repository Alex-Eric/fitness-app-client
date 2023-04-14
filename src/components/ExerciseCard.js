import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function ExerciseCard({
    _id,
  name,
  type,
  muscle,
  equipment,
  difficulty,
  description,
}) {
    const {id} = _id
  return (
    <Link to={`/exercise/${id}`}>
    <Card style={{ width: "20rem", height:"30rem" ,padding:"20px",margin:"5px", display: "inline-block", overflow:"scroll"}}>
    <Card.Img
      variant="top"
      src="https://static.strengthlevel.com/images/illustrations/incline-hammer-curl-1000x1000.jpg"
    />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card></Link>
    
  );
}

export default ExerciseCard;
