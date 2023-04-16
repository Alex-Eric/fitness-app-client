import { useState } from "react";
import { Button, Spinner, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExerciseCreate() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description,setDescription] = useState("")

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const types = [
    "strength",
    "olympic_weightlifting",
    "strongman",
    "powerlifting",
    "cardio",
    "stretching",
    "plyometrics",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    setValidated(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/exercises/create`, { name, type, description })
      .then(() => {
        console.log("IN");
        navigate("/exercises");
      })
      .catch((err) => console.log("Error: ", err));
    }

    
    console.log({ name, type , description});

  return (
    <>
      <h1>Create an exercise!</h1>
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

        <FloatingLabel controlId="floatingSelect" label="Exercise's type">
          <Form.Select
            required
            size="2"
            aria-label="Default select example"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option selected value={""}>
              Open this select menu
            </option>
            {types ? (
              types.map((element) => (
                <option key={element._id} value={element}>
                  {element
                    .split("_")
                    .map((e) => e.charAt().toUpperCase() + e.slice(1))
                    .join(" ")}
                </option>
              ))
            ) : (
              <Spinner animation="border" />
            )}
          </Form.Select>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please choose a type</Form.Control.Feedback>
        </FloatingLabel> <br />
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

export default ExerciseCreate;
