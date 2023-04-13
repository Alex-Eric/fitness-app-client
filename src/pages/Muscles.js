import axios from "axios";
import { useState, useEffect } from "react";
import MuscleCard from "../components/MuscleCard";

function Muscles() {
  const [muscles, setMuscles] = useState(null);

  const getAllMuscles = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/muscles` ||
          "http://127.0.0.1:5005/api/muscles"
      )
      .then((response) => {
        setMuscles(response.data);
      });
  };
  useEffect(() => {
    getAllMuscles();
  }, []);
  return (
    <>
        <h1>Muscles</h1>
    {muscles ?  
        muscles.map((muscle) => {
        return (
          <MuscleCard key={muscle._id} {...muscle}/>
        )})
      : "Loading..."
      }
      
    </>
  );
}
export default Muscles;
