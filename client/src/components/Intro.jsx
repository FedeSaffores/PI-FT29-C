import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <div>
      <Link className="Intro" to={"/dogs"}>
        HOME
      </Link>
    </div>
  );
};
export default Intro;
