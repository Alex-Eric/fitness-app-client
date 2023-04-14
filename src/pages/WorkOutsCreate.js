import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorkOutsCreate() {
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

    axios.post(`${process.env.REACT_APP_API_URL}/workouts/create`, workOutData)
    .then((response)=>{
        navigate("/workouts")
        console.log(response)
    })
    .catch((e)=>{
        console.log("error...",e)
    })
  }

  return (
    <>
      <h1>WorkOuts Create</h1>
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
export default WorkOutsCreate;
