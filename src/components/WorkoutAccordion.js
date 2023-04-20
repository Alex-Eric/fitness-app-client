import { Accordion } from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import WorkoutEdit from "./WorkoutEdit";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../context/auth.context";

//Import all the muscles images
import abdominals from "./../images/abdominals.png";
import abductors from "./../images/abductors.png";
import adductors from "./../images/adductors.png";
import biceps from "./../images/biceps.png";
import calves from "./../images/calves.png";
import chest from "./../images/chest.png";
import forearms from "./../images/forearms.png";
import glutes from "./../images/glutes.png";
import hamstrings from "./../images/biceps.png";
import lats from "./../images/lats.png";
import lower_back from "./../images/lower_back.png";
import middle_back from "./../images/middle_back.png";
import neck from "./../images/neck.png";
import quadriceps from "./../images/quadriceps.png";
import traps from "./../images/traps.png";
import triceps from "./../images/triceps.png";

function WorkoutAccordion(props) {
  const [update, setUpdate] = useState(false);
  const [editBtn, setEditBtn] = useState("Edit");
  const { user } = useContext(AuthContext);

  function imageName(image) {
    switch (image) {
      case "abdominals":
        return <img src={abdominals} alt={abdominals} width={"150em"} />;
      case "abductors":
        return <img src={abductors} alt={abductors} width={"150em"} />;
      case "adductors":
        return <img src={adductors} alt={adductors} width={"150em"} />;
      case "neck":
        return <img src={neck} alt={neck} width={"150em"} />;
      case "biceps":
        return <img src={biceps} alt={biceps} width={"150em"} />;
      case "calves":
        return <img src={calves} alt={calves} width={"150em"} />;
      case "chest":
        return <img src={chest} alt={chest} width={"150em"} />;
      case "forearms":
        return <img src={forearms} alt={forearms} width={"150em"} />;
      case "glutes":
        return <img src={glutes} alt={glutes} width={"150em"} />;
      case "hamstrings":
        return <img src={hamstrings} alt={hamstrings} width={"150em"} />;
      case "lats":
        return <img src={lats} alt={lats} width={"150em"} />;
      case "lower_back":
        return <img src={lower_back} alt={lower_back} width={"150em"} />;
      case "middle_back":
        return <img src={middle_back} alt={middle_back} width={"150em"} />;
      case "quadriceps":
        return <img src={quadriceps} alt={quadriceps} width={"150em"} />;
      case "traps":
        return <img src={traps} alt={traps} width={"150em"} />;
      case "triceps":
        return <img src={triceps} alt={triceps} width={"150em"} />;
      default:
        <img src={""} alt={""} width={"150em"} />;
        break;
    }
  }

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/workouts/${props.workout._id}`)
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
            <p><h3>Read the instructions before go farther:</h3>{props.workout.description}</p>
            <h2>The exercises of the workout:</h2>
            {/* {props.workout.exercises.length > 0 &&
              `Exercises: ${props.workout.exercises}` + <br />}
            {props.workout.description} */}
            {props.workout.exercises.length > 0 &&
              props.workout.exercises.map((exercise) => {
                return (
                  props.exercisesSelect &&
                  props.exercisesSelect.map((filter) => {
                    return (
                      filter._id === exercise && (
                        <>
                          <Card
                            style={{
                              width: "11rem",
                              height: "16rem",
                              padding: "20px",
                              margin: "5px",
                              display: "inline-block",
                              overflow: "hidden",
                            }}
                          >
                            {/* Display the muscle image */}
                            {imageName(filter.muscle)}
                            <Card.Body>
                              <Card.Title>
                                <h6>{filter.name}</h6>
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        </>
                      )
                    );
                  })
                );
              })}
            <br />
            {props.workout.series > 1 ?<h5>Repeat all the exercises  <b>{props.workout.series}</b> times!</h5> : <h5>Repeat all the exercises 1 time only!</h5>}
            
          </>
        )}
        {update && (
          <WorkoutEdit
            workout={props.workout}
            setEditCheckcallback={props.setEditCheckcallback}
            setExercisesSelectcallback={props.setExercisesSelectcallback}
            exercisesSelect={props.exercisesSelect}
            setUpdatecallback={setUpdate}
          />
        )}
        {
          
          (user &&  (user._id === props.workout.owner && (
            <>
              <Button
                onClick={() =>
                  update
                    ? (setUpdate(false), setEditBtn("Edit"))
                    : (setUpdate(true), setEditBtn("Back"))
                }
              >
                {editBtn}
              </Button>
              <Button
                variant="danger"
                style={{ margin: "5px" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )))
        }
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default WorkoutAccordion;
