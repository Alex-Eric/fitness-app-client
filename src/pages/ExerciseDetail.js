import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";
import { AuthContext } from "../context/auth.context";

function ExerciseDetail(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const { id } = props;
  const { user } = useContext(AuthContext);
  const [exercise, setExercise] = useState(null);
  const [update, setUpdate] = useState(true);
  const [updateName, setUpdateName] = useState("Update");
  const [deleteSure, setDeleteSure] = useState(false);
  const navigate = useNavigate();
  const getExercise = () => {
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/exercises/${id}` ||
      `http://localhost:5005/api/exercises/${id}`
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

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/exercises/${id}`)
      .then(() => {
        navigate("/exercises");
        props.setIdCallback("");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  useEffect(() => {
    getExercise();
  }, [id]);

  return (
    <>
      {exercise ? (
        <>
          {update ? (
            <>
              <Button
                onClick={() => props.setDisplayExerciseCallback(false)}
                style={{ "margin-bottom": "20px" }}
              >
                Back
              </Button>
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
            </>
          ) : (
            <>
              <h1>Update!</h1>
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
                muscles={props.muscles}
                setMusclesCallback={props.setMusclesCallback}
                setUpdateCallback={setUpdate}
                buttonName={"Update"}
                submit={"update"}
              />
            </>
          )}
          {user && user._id === exercise.owner && (
            <>
              <Button
                style={{ width: "20%", "margin-right": "20px" }}
                onClick={() =>
                  update ? (
                    <>
                      {setUpdate(false)} {setUpdateName("Cancel")}
                    </>
                  ) : (
                    <>
                      {setUpdate(true)} {setUpdateName("Update")}
                    </>
                  )
                }
              >
                {updateName}
              </Button>
              {deleteSure ? (
                <Button
                  variant="danger"
                  style={{ width: "20%" }}
                  onClick={() => {
                    props.setDisplayExerciseCallback(false);
                    handleDelete();
                  }}
                >
                  Are you sure?
                </Button>
              ) : (
                <Button
                  variant="danger"
                  style={{ width: "20%" }}
                  onClick={() => setDeleteSure(true)}
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default ExerciseDetail;
