import './App.css';
import {Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import Muscles from './pages/Muscles';
import Workouts from './pages/WorkOuts';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import WorkOutsCreate from './pages/WorkOutsCreate';
import ExerciseCreate from './pages/ExerciseCreate';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/create" element={<ExerciseCreate />} />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
        <Route path="/muscles" element={<Muscles />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/create" element={<WorkOutsCreate />} />
      </Routes>
    </div>
  );
}

export default App;
