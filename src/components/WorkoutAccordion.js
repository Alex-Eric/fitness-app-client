import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

function WorkoutAccordion(props) {
  return (
    <Accordion defaultActiveKey="0">
      {props.workouts.map((element) => {
        return (
          <Accordion.Item eventKey={element._id}>
            <Accordion.Header>{element.name}</Accordion.Header>
            <Accordion.Body>
                Series: {element.series}
                <br />
                {element.exercises.length>0 &&
                  `Exercises: ${element.exercises}` + <br /> }
                {element.description}
                <Link to={`/workouts/${element._id}/edit`}>Edit</Link>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  );
}

export default WorkoutAccordion;
