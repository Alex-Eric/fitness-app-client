import { useState } from "react";
import Card from "react-bootstrap/Card";
import MuscleGroupImage from "./MuscleGroupImage.tsx";

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
      <MuscleGroupImage muscleGroups={[`${photo}`]} />
      
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
