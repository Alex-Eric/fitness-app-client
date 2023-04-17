import { Accordion } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function WorkoutAccordion(props) {
  const id = props.workout._id;

  const navigate = useNavigate();

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
        Series: {props.workout.series}
        <br />
        {props.workout.exercises.length > 0 &&
          `Exercises: ${props.workout.exercises}` + <br />}
        {props.workout.description}
        <br />
        <Button component={Link} to={`/workouts/${props.workout._id}/edit`}>
          Edit
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default WorkoutAccordion;
