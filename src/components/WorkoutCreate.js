import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";

function WorkOutsCreate(props) {
    const [name, setName] = useState("")
    const [series, setSeries] = useState("")
    const [description,setDescription] = useState("")
    const [validated, setValidated] = useState(false);


  function handleSubmit(event) {
    event.preventDefault();

    setValidated(true)
    const workOutData = {
        name,
        series,
        description
    }

    axios.post(`${process.env.REACT_APP_API_URL}/workouts/create`, workOutData)
    .then((response)=>{
        props.setCreateCheckcallback(false)
        props.setCreateBtncallback("Create")
        setName("")
        setSeries("")
        setDescription("")
    })
    .catch((e)=>{
        console.log("error...",e)
    })
  }

  return (
    <>
      <h1>Create a Workout!</h1>
      <Form style={{ margin: "0 20%" }} noValidate validated={validated} onSubmit={handleSubmit}>
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
          <Form.Control.Feedback type="invalid">Please provide a name</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">Please provide a name</Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">Please provide instructions</Form.Control.Feedback>
        </FloatingLabel>

        <br />
        {props.exercisesSelect &&
          props.exercisesSelect.map((exercise) => {
            return(
              <div key={exercise._id} className="mb-3">
          <Form.Check 
            type={"checkbox"}
            id={exercise._id}
            label={exercise.name}
          />
          </div>
          );
          })}

        <br />
        <Button
          variant="danger"
          type="submit"
          style={{ width: "30%" }}
        >
          Create
        </Button>
      </Form>
    </>
  );
}
export default WorkOutsCreate;
