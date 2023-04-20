import Card from "react-bootstrap/Card";

//Import all the muscles images
import abdominals from "./../images/abdominals.png"
import abductors from "./../images/abductors.png"
import adductors from "./../images/adductors.png"
import biceps from "./../images/biceps.png"
import calves from "./../images/calves.png"
import chest from "./../images/chest.png"
import forearms from "./../images/forearms.png"
import glutes from "./../images/glutes.png"
import hamstrings from "./../images/biceps.png"
import lats from "./../images/lats.png"
import lower_back from "./../images/lower_back.png"
import middle_back from "./../images/middle_back.png"
import neck from "./../images/neck.png"
import quadriceps from "./../images/quadriceps.png"
import traps from "./../images/traps.png"
import triceps from "./../images/triceps.png"

function MuscleCard({ name }) {

  //Function to display the image depends on name
  function imageName (image) {
    switch (image) {
      case "abdominals":
        return <img src={abdominals} alt={abdominals} width={"280em"}/>
      case "abductors":
        return <img src={abductors} alt={abductors} width={"280em"}/>
      case "adductors":
        return <img src={adductors} alt={adductors} width={"280em"}/>
      case "neck":
        return <img src={neck} alt={neck} width={"280em"}/>
      case "biceps":
        return <img src={biceps} alt={biceps} width={"280em"}/>
      case "calves":
        return <img src={calves} alt={calves} width={"280em"}/>
      case "chest":
        return <img src={chest} alt={chest} width={"280em"}/>
      case "forearms":
        return <img src={forearms} alt={forearms} width={"280em"}/>
      case "glutes":
        return <img src={glutes} alt={glutes} width={"280em"}/>
      case "hamstrings":
        return <img src={hamstrings} alt={hamstrings} width={"280em"}/>
      case "lats":
        return <img src={lats} alt={lats} width={"280em"}/>
      case "lower_back":
        return <img src={lower_back} alt={lower_back} width={"280em"}/>
      case "middle_back":
        return <img src={middle_back} alt={middle_back} width={"280em"}/>
      case "quadriceps":
        return <img src={quadriceps} alt={quadriceps} width={"280em"}/>
      case "traps":
        return <img src={traps} alt={traps} width={"280em"}/>
      case "triceps":
        return <img src={triceps} alt={triceps} width={"280em"}/>    
      default: <img src={""} alt={""} width={"280em"}/>
        break;
    }
  }
  return (
    <Card
      style={{
        width: "20rem",
        height: "23rem",
        padding: "20px",
        margin: "5px",
        display: "inline-block",
        overflow: "hidden",
      }}
    >
      {/* Display the muscle image */}
      {imageName(name)}
      <Card.Body>
        <Card.Title>
          {name
            .split("_")
            .map((e) => e.charAt().toUpperCase() + e.slice(1))
            .join(" ")}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default MuscleCard;
