import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";

function WorkoutEdit(props) {
  const id = props.workout._id;
  const [name, setName] = useState(props.workout.name);
  const [series, setSeries] = useState(props.workout.series);
  const [description, setDescription] = useState(props.workout.description);
  const [exercises, setExercises] = useState(props.workout.exercises);
  const navigate = useNavigate();
  const [exercisesSelect, setExercisesSelect] = useState(null);

  function handleData(event) {
    event.preventDefault();
    props.setEditCheckcallback(true);
    const workOutData = {
      name,
      series,
      description,
      exercises,
    };
    console.log(workOutData);
    axios
      .put(`${process.env.REACT_APP_API_URL}/workouts/${id}/edit`, workOutData)
      .then(() => {
        navigate("/workouts");
      })
      .catch((e) => {
        console.log("error...", e);
      });
  }
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

  return (
    <>
      <h1>Update</h1>

      <Form style={{ margin: "0 20%" }} onSubmit={handleData}>
        <FloatingLabel
          controlId="floatingInput"
          label="Exercise name"
          className="mb-3"
        >
          <Form.Control
            required
            type="text"
            placeholder=" "
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a name
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Series"
          className="mb-3"
        >
          <Form.Control
            required
            type="number"
            name="series"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a name
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Exercise intructions"
          className="mb-3"
        >
          <Form.Control
            required
            rows={4}
            as="textarea"
            placeholder=" "
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide instructions
          </Form.Control.Feedback>
        </FloatingLabel>

        <br />

        <FloatingLabel
          controlId="floatingInput"
          label="Select Exercises"
          className="mb-3"
        >
          <Form.Select aria-label="Default select example">
            <option value="">Open this select menu</option>
            
            {exercisesSelect &&
          exercisesSelect.map((exercise) => {
            return(
            <option>{exercise.name}</option>
            )
          })}

            
            
          </Form.Select>

          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide instructions
          </Form.Control.Feedback>
        </FloatingLabel>
        
        <br />
        <Button type="submit" style={{ width: "30%" }}>
          Update
        </Button>
      </Form>
    </>
  );
}
export default WorkoutEdit;
