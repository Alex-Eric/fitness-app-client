import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function WorkoutEdit(props) {
  const  id  = props.workout._id;
  const [name, setName] = useState(props.workout.name);
  const [series, setSeries] = useState(props.workout.series);
  const [description, setDescription] = useState(props.workout.description);
  const navigate = useNavigate();

  function handleData(event) {
      event.preventDefault();
      props.setEditCheckcallback(true)
      const workOutData = {
          name,
          series,
          description,
        };
        console.log(workOutData);
        axios
        .put(`${process.env.REACT_APP_API_URL}/workouts/${id}/edit`, workOutData)
        .then(() => {
            navigate("/workouts");
        })
        .catch((e) => {
            console.log("error...", e);
        });
    }
    useEffect(()=>{
      
    })

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
        <button type="submit">Update</button>
      </form>
    </>
  );
}
export default WorkoutEdit;
