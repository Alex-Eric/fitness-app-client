import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MuscleCard({ name, photo }) {
  return (
    <Card
      style={{
        width: "20rem",
        height: "30rem",
        padding: "20px",
        margin: "5px",
        display: "inline-block",
        overflow: "scroll",
      }}
    >
      <Card.Img variant="top" src="https://static.strengthlevel.com/images/illustrations/incline-hammer-curl-1000x1000.jpg" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MuscleCard;
