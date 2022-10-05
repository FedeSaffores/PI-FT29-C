import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Dogs.css";

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
  //console.log(dog);
  return (
    <div>
      <Link to="/dogs" className="Home">
        HOME
      </Link>
      <h3 className="Name">{dog.name}</h3>
      <img src={dog.image} alt={dog.image} />
      <div className="Height">
        <h2>HEIGHT</h2>
        <h3>{dog.height}</h3>
      </div>
      <div className="weight">
        <h2>WEIGHT</h2>
        <h3>{dog.weight}</h3>
      </div>

      <div className="temperament">
        <h2>TEMPERAMENT</h2>
        <h3>{dog.temperament}</h3>
      </div>
      <div className="Lifespan">
        <h2>LIFESPAN</h2>
        <h3>{dog.lifespan}</h3>
      </div>
    </div>
  );
}
export default Dog;
