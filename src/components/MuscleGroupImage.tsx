import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

interface MuscleGroupImageProps {
  muscleGroups: Array<string>;
}

function MuscleGroupImage(props: MuscleGroupImageProps) {
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    axios
      .get(
        `https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${props.muscleGroups.join(
          ","
        )}&color=255,0,0`,
        {
          headers: {
            "X-RapidAPI-Key":
              "87e970ccc6msh95271ac9916449bp1cfd96jsna167b46e9ef0",
            "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const imageFile = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageFile);
        setImage(imageUrl);
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {image ? (
        <img
          src={image}
          alt={`${props.muscleGroups.join(",")}`}
          style={{ width: "16rem" }}
        />
      ) : (
        <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0252/5596/8843/t/34/assets/loading.gif?v=157493769327766696621671056471" />
      )}
    </>
  );
}

export default MuscleGroupImage;
