import axios from "axios";
import { useEffect, useState } from "react";
import {Spinner} from "react-bootstrap"

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
    <>
      <h1>Workouts</h1>
      {workouts ? 
      workouts.map((element)=><h1>{element.name}</h1>)
      :
      <Spinner animation="border"/>
      }
    </>
  );
}
export default Workouts;
