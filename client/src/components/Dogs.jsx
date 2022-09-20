import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Dog() {
  const { idDogs } = useParams();
  const [dog, setDog] = useState();
  useEffect(() => {
    if (idDogs)
      fetch("http://localhost:3001/dogs/" + idDogs)
        .then((res) => res.json())
        .then((res) => setDog(res));
  }, [idDogs, setDog]);
  if (!dog) return null;
  console.log(dog);
  return (
    <div>
      <h2>YOUR DOG</h2>
      <h3>{dog.name}</h3>
      <h2>HEIGHT</h2>
      <h3>{dog.height}</h3>
      <h2>WEIGHT</h2>
      <h3>{dog.weight}</h3>
      <img src={dog.image} alt={dog.image} />
      <h2>TEMPERAMENT</h2>
      <h3>{dog.temperament}</h3>
      <h2>LIFESPAN</h2>
      <h3>{dog.lifespan}</h3>
    </div>
  );
}
export default Dog;
