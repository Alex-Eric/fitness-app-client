import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import WorkoutAccordion from "../components/WorkoutAccordion";
import Accordion from "react-bootstrap/Accordion";
function Workouts() {
  const [workouts, setWorkouts] = useState(null);
  const [deleteCheck, setDeleteCheck] = useState(false);
  function getAllWorkouts() {
    axios.get(`${process.env.REACT_APP_API_URL}/workouts`).then((response) => {
      setWorkouts(response.data);
    });
  }
  useEffect(() => {
    getAllWorkouts();
    setDeleteCheck(false);
  }, [deleteCheck]);
  return (
    <div style={{ margin: " 0 20%" }}>
      <h1>Workouts</h1>
      <Accordion defaultActiveKey="0">
        {workouts ? (
          workouts.map((workout) => {
            return (
              <WorkoutAccordion
                workout={workout}
                setDeleteCheckcallback={setDeleteCheck}
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
