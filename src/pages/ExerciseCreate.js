import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";

function ExerciseCreate() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <h1>Create an exercise!</h1>
      <ExerciseForm
        name={name}
        setNameCallback={setName}
        type={type}
        setTypeCallback={setType}
        description={description}
        setDescriptionCallback={setDescription}
        validated={validated}
        setValidatedCallback={setValidated}
        navigate={navigate}
        buttonName={"Create"}
        submit={"create"}
      />
    </>
  );
}

export default ExerciseCreate;
