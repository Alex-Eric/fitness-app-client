import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";

function ExerciseDetail() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [update, setUpdate] = useState(false);
  const [deleteSure, setDeleteSure] = useState(false);
  const navigate = useNavigate();
  const getExercise = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/exercises/${id}` ||
          "http://localhost:5005/api/exercises"
      )
      .then((response) => {
        setExercise(response.data);
        setName(response.data.name);
        setType(response.data.type);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  useEffect(() => {
    getExercise();
  }, [update]);

  const handleDelete = () => {

    axios
      .delete(`${process.env.REACT_APP_API_URL}/exercises/${id}`)
      .then((response) => {
        navigate("/exercises");
        console.log(response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
      setDeleteSure(false)
  };

  return (
    <>
      {exercise ? (
        <>
          <h1>{exercise.name}</h1>
          <h5>
            {exercise.type
              .split("_")
              .map((e) => e.charAt().toUpperCase() + e.slice(1))
              .join(" ")}
          </h5>
          <p style={{ margin: "20px 20%", "line-height": "1.5" }}>
            {exercise.description}
          </p>
          {update && (
            <ExerciseForm
              key={exercise._id}
              id={exercise._id}
              name={name}
              setNameCallback={setName}
              type={type}
              setTypeCallback={setType}
              description={description}
              setDescriptionCallback={setDescription}
              validated={validated}
              setValidatedCallback={setValidated}
              setUpdateCallback={setUpdate}
              buttonName={"Send"}
              submit={"update"}
            />
          )}
          <Button
            variant="danger"
            style={{ width: "20%", "margin-right": "20px" }}
            onClick={() => (update ? setUpdate(false) : setUpdate(true))}
          >
            Update
          </Button>
          {deleteSure ? (
            <Button
              variant="danger"
              style={{ width: "20%" }}
              onClick={handleDelete}
            >
              Are you sure?
            </Button>
          ) : (
            <Button
              variant="danger"
              style={{ width: "20%" }}
              onClick={()=>setDeleteSure(true)}
            >
              Delete
            </Button>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default ExerciseDetail;
