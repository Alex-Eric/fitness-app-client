import {useEffect, useState} from "react";
import axios from "axios";

interface MuscleGroupImageProps {
    muscleGroups: Array<string>
}

export default function MuscleGroupImage(props: MuscleGroupImageProps) {
    const [image, setImage] = useState("");

    const fetchImage = async() => {
        axios.get(`https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${props.muscleGroups.join(",")}`, {
            headers: {
                'X-RapidAPI-Key': '87e970ccc6msh95271ac9916449bp1cfd96jsna167b46e9ef0',
                'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
            },
            responseType: "arraybuffer"
        }).then((response) => {
            const imageFile = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(imageFile);
            setImage(imageUrl)
        });
    }

    useEffect(() => {
        fetchImage()
    }, [])

    return <img src={image} alt={`Image of ${props.muscleGroups.join(",")}`} />
}