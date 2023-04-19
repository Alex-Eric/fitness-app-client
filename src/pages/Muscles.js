import { Spinner } from "react-bootstrap";
import MuscleCard from "../components/MuscleCard";

function Muscles(props) {
  return (
    <>
      <h1 className="title-page">Muscles</h1>
      <p className="p-page"> 
        On this page you will find all the muscles that you can exercise on our
        website with the exercises of our routines
      </p>
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
