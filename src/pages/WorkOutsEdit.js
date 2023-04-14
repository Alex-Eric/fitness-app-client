import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function WorkOutsEdit() {
   const {id} = useParams();
    const [name, setName] = useState("")
    const [series, setSeries] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate();
  function handleData(event) {
    event.preventDefault();
    const workOutData = {
        name,
        series,
        description
    }

    axios.put(`${process.env.REACT_APP_API_URL}/workouts/${id}/edit`, workOutData)
    .then(()=>{
        navigate("/workouts")
    })
    .catch((e)=>{
        console.log("error...",e)
    })
  }

  return (
    <>
      <h1>WorkOuts Update</h1>
      <form onSubmit={handleData}>
        <label>Name:</label>

        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br />

        <label>Series:</label>

        <br />
        <input
          type="number"
          name="series"
          value={series}
          onChange={(event) => setSeries(event.target.value)}
        />

        <br />

        <label>Description:</label>

        <br />
        <input
          type="text"
          name="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <button>Create</button>
      </form>
    </>
  );
}
export default WorkOutsEdit;
