import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import {
  getDogs,
  getDogsByName,
  getTemperamentos,
  ordAlf,
  ordRevAlf,
  ordXMayorPeso,
  ordXMenorPeso,
} from "../redux/actions/actions";
import { Link } from "react-router-dom";
import "./order/order.js";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.Dogs);
  const allTemp = useSelector((state) => [
    ...new Set(
      state.Dogs.map((x) =>
        x.temperament?.split(",").map((x) => x.trim())
      ).flat()
    ),
  ]);

  const [temp, setTemp] = useState("");
  const [page, setPage] = useState(0);
  const [busqueda, setBusqueda] = useState("");

  const inputHandler = (e) => {
    setBusqueda(e.target.value);
  };
  const onClickHandler = () => {
    dispatch(getDogsByName(busqueda));
  };
  const homeHandler = () => {
    dispatch(getDogs());
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentos());
  }, [dispatch]);

  return (
    <div>
      <button
        className="btnSiguiente"
        onClick={() => setPage(page + 1)}
        disabled={dogs?.slice((page + 1) * 8).length === 0}
      >
        {" "}
        Siguiente
      </button>
      <button
        className="btnAnterior"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        {" "}
        Anterior
      </button>
      <button className="btn1" onClick={() => dispatch(ordAlf())}>
        {" "}
        ORD ALF A-Z
      </button>

      <button className="btn2" onClick={() => dispatch(ordRevAlf())}>
        {" "}
        ORD Alf Z-A
      </button>
      <button className="Mayores" onClick={() => dispatch(ordXMayorPeso())}>
        ORD MAYORES
      </button>
      <button className="Menores" onClick={() => dispatch(ordXMenorPeso())}>
        ORD MENOR
      </button>
      <Link className="Linkmake" to={"/makedog"}>
        Make your Dog
      </Link>

      <input
        type="text"
        placeholder="Search by Name"
        className="InputSearch"
        name="input"
        autoComplete="off"
        onChange={inputHandler}
      />
      <button className="Search" onClick={onClickHandler}>
        SEARCH
      </button>
      <button className="Reset" onClick={homeHandler}>
        RESET
      </button>
      <select
        onChange={(e) => {
          setTemp(e.target.value);
          setPage(0);
        }}
        defaultValue={""}
        className="ORDTEMP"
      >
        <option disabled value={"Temperament"}>
          Temperaments
        </option>
        <option value="">All</option>
        {allTemp?.map((temp, index) => (
          <option value={temp} key={index}>
            {temp}
          </option>
        ))}
      </select>
      {dogs.length === 0 && <h1>NO HAY DOGS </h1>}
      {dogs
        ?.filter((e) => (temp !== "" ? e.temperament?.includes(temp) : true))
        .slice(page * 8, (page + 1) * 8)
        .map((e) => {
          return (
            <div key={e.id} className="Caja">
              <Link className="Link" to={`/dogs/${e.id}`}>
                {e.name}
              </Link>
              <h2>TEMPERAMENT</h2>
              <h3>{e.temperament}</h3>
              <h2>WEIGTH</h2>
              <h3>{e.weight}</h3>
              <img src={e.image} alt={e.name} />
            </div>
          );
        })}
    </div>
  );
}
export default Home;
