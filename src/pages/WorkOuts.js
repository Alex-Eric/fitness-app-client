import axios from "axios";
import { useEffect, useState } from "react";
import {Spinner} from "react-bootstrap"
import WorkoutAccordion from "../components/WorkoutAccordion";

function Workouts() {
    const [workouts, setWorkouts] = useState(null)

function getAllWorkouts(){
    axios.get(`${process.env.REACT_APP_API_URL}/workouts`)
    .then((response)=>{
      setWorkouts(response.data)
    });
}
useEffect(()=>{ 
    getAllWorkouts();
  },[])
  return (
    <div style={{margin:" 0 20%"}}>
      <h1>Workouts</h1>
      {workouts ? 
        <WorkoutAccordion workouts={workouts}/>
      :
      <Spinner animation="border"/>
      }
    </div>
  );
}
export default Workouts;
