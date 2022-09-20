import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createDogs,
  getDogs,
  getTemperamentos,
} from "../redux/actions/actions";

const Formulario = () => {
  const allTemp = useSelector((state) => state.Temperamentos);
  const [inputName, setInputName] = useState("");
  const dispatch = useDispatch();

  const [formulario, setFormulario] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifespan: "",
    temperament: [],
  });
  const stateReset = () => {
    setFormulario({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifespan: "",
      temperament: [],
    });
    setInputName("");
  };
  const [errors, setError] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifespan: "",
    temperament: [],
  });

  const submitInput = (e) => {
    e.preventDefault();
    setInputName(e.target.value);
  };
  const setDataHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "temperament")
      value =
        inputName !== ""
          ? [...e.target.options]
              .filter((option) => option.selected)
              .map((x) => x.value)
              .concat(formulario.temperament)
          : [...e.target.options]
              .filter((option) => option.selected)
              .map((x) => x.value);
    setFormulario({
      ...formulario,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    dispatch(getDogs(inputName));
    dispatch(getTemperamentos(inputName));
  }, [inputName]);

  const submitForm = (e) => {
    e.preventDefault();

    if (/^[a-zA-Z ]+$/.test(formulario.name.trim()))
      setError({
        ...errors,
        name: "El nombre  tiene que contener solo letras",
      });
    if (isNaN(parseInt(formulario.heightMax)))
      setError({
        ...errors,
        heightMax: "El peso maximo no es un numero",
      });
    if (isNaN(parseInt(formulario.heightMin)))
      setError({
        ...errors,
        heightMin: "El peso minimo no es un numero",
      });
    if (formulario.heightMax < formulario.heightMin)
      setError({
        ...errors,
        heightMax: `El peso maximo debe ser mayor a ${formulario.heightMin}`,
      });
    if (formulario.heightMin > formulario.heightMax)
      setError({
        ...errors,
        heightMin: `El peso minimo debe ser mayor a ${formulario.heightMax}`,
      });
    if (isNaN(parseInt(formulario.weightMin)))
      setError({
        ...errors,
        weightMin: "La altura minima no es un numero",
      });
    if (isNaN(parseInt(formulario.weightMax)))
      setError({
        ...errors,
        weightMax: "La altura minima no es un numero",
      });
    if (formulario.weightMin > formulario.weightMax)
      setError({
        ...errors,
        weightMin: `La altura minima no debe ser mayor a ${formulario.weightMax}`,
      });
    if (formulario.weightMax < formulario.weightMin)
      setError({
        ...errors,
        weightMax: `La altura maxima no debe ser menor a ${formulario.weightMin}`,
      });
    if (!formulario.temperament)
      setError({
        ...errors,
        temperament: "Es necesario almenos agragar un temperamento",
      });
    const newDog = {
      name: formulario.name,
      height: `${formulario.heightMin} - ${formulario.heightMax}`,
      weight: `${formulario.weightMin} - ${formulario.weightMax}`,
      lifespan: formulario.lifespan,
      temperament: formulario.temperament,
    };
    if (newDog) {
      dispatch(createDogs(newDog));
      stateReset();
      alert("Dog created");
    }
  };
  return (
    <div>
      <Link to="/dogs" className="Home">
        HOME
      </Link>
      <h1>Create a New Dog</h1>
      <form onSubmit={(e) => submitForm(e)} onReset={() => stateReset()}>
        <input
          className="Nombre"
          name="name"
          autoComplete="off"
          placeholder="Name your Dog"
          onChange={setDataHandler}
        />
        <h1>MINIMUM HEIGHT</h1>
        <input
          className="height1"
          type="text"
          name="heightMin"
          autoComplete="off"
          placeholder="Min Height"
          value={formulario.heightMin}
          onChange={setDataHandler}
        />
        <h2>MAXIMUM HEIGHT</h2>
        <input
          className="height2"
          type="text"
          name="heightMax"
          autoComplete="off"
          placeholder="Max Height"
          value={formulario.heightMax}
          onChange={setDataHandler}
        />
        <h2>MINIMUM WEIGHT</h2>
        <input
          className="weightMin"
          type="text"
          name="weightMin"
          autocomplete="off"
          placeholder="Min Weight"
          value={formulario.weightMin}
          onChange={setDataHandler}
        />
        <h2>MAXIMUM WEIGHT</h2>
        <input
          className="weightMax"
          type="text"
          name="weightMax"
          autocompleat="off"
          placeholder="Max Weight"
          value={formulario.weightMax}
          onChange={setDataHandler}
        />
        <h2>LIFESPAN</h2>
        <input
          className="life"
          type="text"
          name="lifespan"
          autocompleat="off"
          placeholder="Put the Lifespan"
          value={formulario.lifespan}
          onChange={setDataHandler}
        />
        <h2>TEMPERAMENT</h2>
        <input
          className="Temperamento"
          type="text"
          name="temperament"
          autoComplete="off"
          placeholder="Search Temperament"
          onChange={submitInput}
        />
        <select
          multiple
          name="temperament"
          onChange={setDataHandler}
          value={formulario.temperament}
          options={allTemp.map((e) => ({ value: e.id, label: e.name }))}
        >
          {allTemp.map((e) => (
            <option value={e.id} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button type="submit" className="button">
          Add dog
        </button>
        <button type="reset" className="button1">
          Delete dog
        </button>
      </form>
    </div>
  );
};
export default Formulario;
