import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExerciseCreate() {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState(null);
  const [type, setType] = useState([]);
  const navigate = useNavigate();

  const getExercisesType = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        const data = response.data.map((e) => e.type).filter((value, index, self) => self.indexOf(value) === index);
        console.log(data)
        setType(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  // const type = exercises.map(e=>e.type)

  useEffect(() => {
    getExercisesType();
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/exercises/create`, { name })
      .then((response) => {
        navigate("/exercises");
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <>
      <h1>CREATE</h1>
      <form>
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
        <select name="type">
          {type ? (
            type.map((e) => (
              <option key={e._id} value={e}>
                {e}
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
      </form>
    </>
  );
}

export default ExerciseCreate;
