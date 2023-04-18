import Card from "react-bootstrap/Card";

function MuscleCard({ name, photo }) {
  return (
    <Card
      style={{
        width: "20rem",
        height: "23rem",
        padding: "20px",
        margin: "5px",
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      <Card.Img
        variant="top"
        src={photo}
      />
      <Card.Body>
        <Card.Title>
          {name
            .split("_")
            .map((e) => e.charAt().toUpperCase() + e.slice(1))
            .join(" ")}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default MuscleCard;
