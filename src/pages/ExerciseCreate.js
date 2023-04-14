import { useState } from "react";
import { Button, Spinner, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExerciseCreate() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
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

  const handleSubmit = () => {
    console.log({ name, type });
    axios
      .post(`${process.env.REACT_APP_API_URL}/exercises/create`, { name, type })
      .then(() => {
        console.log("IN");
        navigate("/exercises");
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <>
      <h1>CREATE</h1>
      {/* <form>
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <label>Type</label>
        <br />
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
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
        </select>{" "}
        <br />
        <Button variant="danger" onClick={handleSubmit}>
          Create
        </Button>
      </form> */}
      <Form style={{ margin: "0 20%" }}>
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
        </FloatingLabel>
        <br />
        <Button
          variant="danger"
          onClick={handleSubmit}
          style={{ width: "30%" }}
        >
          Create
        </Button>
      </Form>
    </>
  );
}

export default ExerciseCreate;
