import { Accordion } from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useState } from "react";
import WorkoutEdit from "./WorkoutEdit";

function WorkoutAccordion(props) {
  const [update, setUpdate] = useState(false);
  const [editBtn, setEditBtn] = useState("Edit");

  const id = props.workout._id;

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/workouts/${id}`)
      .then(() => {
        props.setDeleteCheckcallback(true);
      })
      .catch((e) => {
        console.log("error...", e);
      });
  };
  return (
    <Accordion.Item eventKey={props.workout._id}>
      <Accordion.Header>{props.workout.name}</Accordion.Header>
      <Accordion.Body>
        {!update && (
          <>
            Series: {props.workout.series}
            <br />
            {props.workout.exercises.length > 0 &&
              `Exercises: ${props.workout.exercises}` + <br />}
            {props.workout.description}
            <br />
          </>
        )}
        {update && <WorkoutEdit workout={props.workout} setEditCheckcallback={props.setEditCheckcallback} />}
        <Button
          onClick={() =>
            update
              ? (setUpdate(false), setEditBtn("Edit"))
              : (setUpdate(true), setEditBtn("Back"))
          }
        >
          {editBtn}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default WorkoutAccordion;
