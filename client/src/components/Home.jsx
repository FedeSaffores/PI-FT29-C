import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { getDogs, getDogsByName } from "../redux/actions/actions";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.Dogs);
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
      <input
        type="text"
        placeholder="Search"
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
      {dogs?.slice(page * 8, (page + 1) * 8).map((e) => {
        return (
          <div>
            <Link className="Link" to={`/dogs/${e.id}`}>
              {e.name}
            </Link>
            <img src={e.image} alt={e.name} />
            <h3>{e.temperament}</h3>
            <h3>{e.weight}</h3>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
