import './App.css';
import {Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import Muscles from './pages/Muscles';
import Workouts from './pages/WorkOuts';
import Exercises from './pages/Exercises';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/muscles" element={<Muscles />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
