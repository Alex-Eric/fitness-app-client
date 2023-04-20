import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//Import all the muscles images
import abdominals from "./../images/abdominals.png";
import abductors from "./../images/abductors.png";
import adductors from "./../images/adductors.png";
import biceps from "./../images/biceps.png";
import calves from "./../images/calves.png";
import chest from "./../images/chest.png";
import forearms from "./../images/forearms.png";
import glutes from "./../images/glutes.png";
import hamstrings from "./../images/biceps.png";
import lats from "./../images/lats.png";
import lower_back from "./../images/lower_back.png";
import middle_back from "./../images/middle_back.png";
import neck from "./../images/neck.png";
import quadriceps from "./../images/quadriceps.png";
import traps from "./../images/traps.png";
import triceps from "./../images/triceps.png";

function ExerciseCard(props) {
  const idExercise = props.exercises._id;
  const idOwner = props.exercises.owner;
  const user = props.users.filter((a) => a._id === idOwner)[0];

  //Function to display the image depends on name
  function imageName(image) {
    switch (image) {
      case "abdominals":
        return <img src={abdominals} alt={abdominals} width={"280em"} />;
      case "abductors":
        return <img src={abductors} alt={abductors} width={"280em"} />;
      case "adductors":
        return <img src={adductors} alt={adductors} width={"280em"} />;
      case "neck":
        return <img src={neck} alt={neck} width={"280em"} />;
      case "biceps":
        return <img src={biceps} alt={biceps} width={"280em"} />;
      case "calves":
        return <img src={calves} alt={calves} width={"280em"} />;
      case "chest":
        return <img src={chest} alt={chest} width={"280em"} />;
      case "forearms":
        return <img src={forearms} alt={forearms} width={"280em"} />;
      case "glutes":
        return <img src={glutes} alt={glutes} width={"280em"} />;
      case "hamstrings":
        return <img src={hamstrings} alt={hamstrings} width={"280em"} />;
      case "lats":
        return <img src={lats} alt={lats} width={"280em"} />;
      case "lower_back":
        return <img src={lower_back} alt={lower_back} width={"280em"} />;
      case "middle_back":
        return <img src={middle_back} alt={middle_back} width={"280em"} />;
      case "quadriceps":
        return <img src={quadriceps} alt={quadriceps} width={"280em"} />;
      case "traps":
        return <img src={traps} alt={traps} width={"280em"} />;
      case "triceps":
        return <img src={triceps} alt={triceps} width={"280em"} />;
      default:
        <img src={""} alt={""} width={"280em"} />;
        break;
    }
  }

  return (
    <Link
      onClick={() => {
        props.setIdCallback(idExercise);
        props.setDisplayExerciseCallback(true);
      }}
    >
      <Card
        style={{
          width: "20rem",
          height: "30rem",
          padding: "20px",
          margin: "5px",
          display: "inline-block",
          overflow: "hidden",
          textDecoration: "none",
          color: "black",
        }}
      >
        {imageName(props.exercises.muscle)}
        <div
          style={{
            display: "grid",
            "place-items" : "center",
            height: "10rem",
          }}
        >
          <Card.Body>
            <Card.Title><h3>{props.exercises.name}</h3></Card.Title> <br />
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Created by <span style={{color:"rgb(240,100,80)"}}>{user.name}</span></Card.Subtitle>
          </Card.Body>
        </div>
      </Card>
    </Link>
  );
}

export default ExerciseCard;
