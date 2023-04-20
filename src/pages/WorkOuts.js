import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import WorkoutAccordion from "../components/WorkoutAccordion";
import Accordion from "react-bootstrap/Accordion";
import WorkoutCreate from "../components/WorkoutCreate";
import Login from "./Login";
import { AuthContext } from "../context/auth.context";

function Workouts() {
  const { isLoggedIn } = useContext(AuthContext);
  const [createCheck, setCreateCheck] = useState(false);
  const [workouts, setWorkouts] = useState(null);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [editCheck, setEditCheck] = useState(false);
  const [createBtn, setCreateBtn] = useState("Create");
  const [exercisesSelect, setExercisesSelect] = useState(null);

  const getAllExercisesSelect = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        setExercisesSelect(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  useEffect(() => {
    getAllExercisesSelect();
  }, []);

  function getAllWorkouts() {
    axios.get(`${process.env.REACT_APP_API_URL}/workouts`).then((response) => {
      setWorkouts(response.data);
    });
  }
  useEffect(() => {
    getAllWorkouts();
    setDeleteCheck(false);
    setEditCheck(false);
  }, [deleteCheck, editCheck, createCheck]);
  return (
    <div style={{ margin: " 0 20%" }}>
      <h1>Workouts</h1>
      <Button
          onClick={() =>
            createCheck
              ? (setCreateCheck(false), setCreateBtn("Create a Workout"))
              : (setCreateCheck(true), setCreateBtn("Cancel"))
          }
        >
          {createBtn}
        </Button>
      <br /> 

       
    
        {createCheck && (
        <>
          <br />
          {isLoggedIn ? (
            <WorkoutCreate
                setCreateCheckcallback={setCreateCheck}
                setCreateBtncallback={setCreateBtn}
                setExercisesSelectcallback={setExercisesSelect}
                exercisesSelect={exercisesSelect}
              />
          ) : (
            <Login />
          )}

          <br />
        </>
      )}


      <br />
      <Accordion defaultActiveKey="0" style={{margin: "0 -25%"}}>
        {workouts ? (
          workouts.map((workout) => {
            return (
              <WorkoutAccordion
                workout={workout}
                setDeleteCheckcallback={setDeleteCheck}
                setEditCheckcallback={setEditCheck}
                setExercisesSelectcallback={setExercisesSelect}
                exercisesSelect={exercisesSelect}
              />
            );
          })
        ) : (
          <Spinner animation="border" />
        )}
      </Accordion>
    </div>
  );
}
export default Workouts;
