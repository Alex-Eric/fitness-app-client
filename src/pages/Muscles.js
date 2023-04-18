import { Spinner } from "react-bootstrap";
import MuscleCard from "../components/MuscleCard";

function Muscles(props) {

  
  return (
    <>
      <h1>Muscles</h1>
      {props.muscles ? (
        props.muscles.map((muscle) => {
          return <MuscleCard key={muscle._id} {...muscle} />;
        })
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}
export default Muscles;
