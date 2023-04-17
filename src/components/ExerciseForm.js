import { Button, FloatingLabel, Spinner, Form } from "react-bootstrap";
import axios from "axios";

function ExerciseForm(props) {
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

    props.setValidatedCallback(true);
    if (props.submit === "create") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/exercises/create`, {
          name: props.name,
          type: props.type,
          description: props.description,
        })
        .then(() => {
          console.log("IN");
          props.navigate("/exercises");
        })
        .catch((err) => console.log("Error: ", err));
    } else if (props.submit === "update") {
      const id = props.id;
      axios
        .put(`${process.env.REACT_APP_API_URL}/exercises/${id}`, {
          name: props.name,
          type: props.type,
          description: props.description,
        })
        .then((response) => {
            console.log(response)
            props.setUpdateCallback(false)
            props.navigate(`exercises/${id}`)
        })
        .catch((err) => console.log("Error: ", err));
    }
  };
  return (
    <>
      <Form
        style={{ margin: "0 20%" }}
        noValidate
        validated={props.validated}
        onSubmit={handleSubmit}
      >
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
            value={props.name}
            onChange={(e) => props.setNameCallback(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a name
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Exercise's type">
          <Form.Select
            required
            size="2"
            aria-label="Default select example"
            name="type"
            value={props.type}
            onChange={(e) => props.setTypeCallback(e.target.value)}
          >
            <option value={""}>Open this select menu</option>
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
          <Form.Control.Feedback type="invalid">
            Please choose a type
          </Form.Control.Feedback>
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          label="Exercise intructions"
          className="mb-3"
        >
          <Form.Control
            required
            as="textarea"
            style={{ height: "10rem" }}
            placeholder=""
            name="description"
            value={props.description}
            onChange={(e) => props.setDescriptionCallback(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide instructions
          </Form.Control.Feedback>
        </FloatingLabel>
        <br />
        <Button
          variant="danger"
          type="submit"
          style={{ width: "30%", "margin-bottom": "30px" }}
        >
          {props.buttonName}
        </Button>
      </Form>
    </>
  );
}

export default ExerciseForm;
