import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [muscles, setMuscles] = useState(null);
  const [imageMuscles, setImageMuscles] = useState(null);

  useEffect(() => {
    const optionsImage = {
      method: "GET",
      url: "https://muscle-group-image-generator.p.rapidapi.com/getImage",
      params: {
        muscleGroups: "biceps",
        color: "255,0,0",
        transparentBackground: "0",
      },
      headers: {
        "X-RapidAPI-Key": "87e970ccc6msh95271ac9916449bp1cfd96jsna167b46e9ef0",
        "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
      },
    };

    axios
      .request(optionsImage)
      .then(function (response) {
        setImageMuscles(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);




  useEffect(() => {
    const optionsMuscles = {
      method: "GET",
      url: "https://muscle-group-image-generator.p.rapidapi.com/getMuscleGroups",
      headers: {
        "X-RapidAPI-Key": "87e970ccc6msh95271ac9916449bp1cfd96jsna167b46e9ef0",
        "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
      },
    };
    axios
      .request(optionsMuscles)
      .then(function (response) {
        setMuscles(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>HomePage</h1>
      {muscles ? muscles.map(e=>{
        return (<>{e} <br /></>)
      }) : "loading..."}
      {imageMuscles ? <img src={imageMuscles} alt="" /> : "loading..."}

    </>
  );
    }

export default HomePage;
