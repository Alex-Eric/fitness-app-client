import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Muscles from "./pages/Muscles";
import Workouts from "./pages/WorkOuts";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
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
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/muscles"
          element={
            <Muscles muscles={muscles} setMusclesCallback={setMuscles} />
          }
        />
        <Route path="/exercises" element={<Exercises muscles={muscles} setMusclesCallback={setMuscles}/>} />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
