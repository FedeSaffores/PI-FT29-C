import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createDogs,
  getDogs,
  getTemperamentos,
} from "../redux/actions/actions";
import "./Formulario.css";

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
    lifespanMin: "",
    lifespanMax: "",
    temperament: [],
  });
  const stateReset = () => {
    setFormulario({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifespanMin: "",
      lifespanMax: "",
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
    lifespanMin: "",
    lifespanMax: "",
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
    let objErr = {};
    //console.log(formulario);
    //console.log(formulario.name, /^[a-zA-Z ]+$/.test(formulario.name.trim()));
    if (!/^[a-zA-Z ]+$/.test(formulario.name.trim())) {
      objErr["name"] = "El nombre  tiene que contener solo letras";
      //expresion regular, contiene solo letras ya sea mayuscula y minuscula.
    }
    if (isNaN(parseInt(formulario.heightMax))) {
      objErr["heightMax"] = "La altura maximo no es un numero";
    }
    if (isNaN(parseInt(formulario.heightMin))) {
      objErr["heightMin"] = "La altura minima no es un numero";
    }
    if (parseInt(formulario.heightMax) < parseInt(formulario.heightMin)) {
      objErr[
        "heightMax"
      ] = `La altura maximo debe ser mayor a ${formulario.heightMin}`;
      objErr[
        "heightMin"
      ] = `La altura minimo debe ser menor a ${formulario.heightMax}`;
    }
    if (isNaN(parseInt(formulario.weightMin))) {
      objErr["weightMin"] = "El peso minimo no es un numero";
    }
    if (isNaN(parseInt(formulario.weightMax))) {
      objErr["weightMax"] = "El peso maximo no es un numero";
    }
    if (parseInt(formulario.weightMin) > parseInt(formulario.weightMax)) {
      objErr[
        "weightMin"
      ] = `El peso minimo debe ser menor a ${formulario.weightMax}`;
      objErr[
        "weightMax"
      ] = `El peso maximo no debe ser menor a ${formulario.weightMin}`;
    }
    if (isNaN(parseInt(formulario.lifespanMax))) {
      objErr["lifespanMax"] = "Es necesario agregar al menos un numero";
    }
    if (isNaN(parseInt(formulario.lifespanMin))) {
      objErr["lifespanMin"] = "Es necesario agregar al menos un numero";
    }
    if (parseInt(formulario.lifespanMin) > parseInt(formulario.lifespanMax)) {
      objErr[
        "lifespanMin"
      ] = `El Minimo expectativa de vida no puede ser mayor a ${formulario.lifespanMax}`;
      objErr[
        "lifespanMax"
      ] = `El Maximo expectativa de vida no debe ser menor a ${formulario.lifespanMin}`;
    }
    if (formulario.temperament.length === 0) {
      objErr["temperament"] = "Es necesario almenos agragar un temperamento";
    }
    if (Object.keys(objErr).length === 0) {
      const newDog = {
        name: formulario.name,
        height: `${formulario.heightMin} - ${formulario.heightMax}`,
        weight: `${formulario.weightMin} - ${formulario.weightMax}`,
        lifespan: `${formulario.lifespanMin} - ${formulario.lifespanMax} years`,
        temperament: formulario.temperament,
      };

      if (newDog) {
        dispatch(createDogs(newDog));
        stateReset();
        alert("Dog created");
      }
    } else {
      setError(objErr);
    }
  };
  return (
    <div>
      <Link to="/dogs" className="Home">
        HOME
      </Link>
      <h2 className="CreateDog">Create a New Dog</h2>
      <form onSubmit={(e) => submitForm(e)} onReset={() => stateReset()}>
        <input
          className="Nombre"
          name="name"
          autoComplete="off"
          placeholder="Name your Dog"
          onChange={setDataHandler}
        />
        <div className="error">{errors?.name}</div>
        <h2 className="bt1">MINIMUM HEIGHT</h2>
        <input
          className="Input"
          type="text"
          name="heightMin"
          autoComplete="off"
          placeholder="Min Height"
          value={formulario.heightMin}
          onChange={setDataHandler}
        />
        <div className="error">{errors?.heightMin}</div>
        <h2 className="bt1">MAXIMUM HEIGHT</h2>
        <input
          className="Input"
          type="text"
          name="heightMax"
          autoComplete="off"
          placeholder="Max Height"
          value={formulario.heightMax}
          onChange={setDataHandler}
        />
        <div className="error">{errors?.heightMax}</div>
        <h2 className="bt1">MINIMUM WEIGHT</h2>
        <input
          className="Input"
          type="text"
          name="weightMin"
          autoComplete="off"
          placeholder="Min Weight"
          value={formulario.weightMin}
          onChange={setDataHandler}
        />
        <div className="error">{errors?.weightMin}</div>
        <h2 className="bt1">MAXIMUM WEIGHT</h2>
        <input
          className="Input"
          type="text"
          name="weightMax"
          autoComplete="off"
          placeholder="Max Weight"
          value={formulario.weightMax}
          onChange={setDataHandler}
        />
        <div className="error">{errors?.weightMax}</div>
        <h2 className="bt1">MINIMUM LIFESPAN</h2>
        <input
          className="Input"
          type="text"
          name="lifespanMin"
          autoComplete="off"
          placeholder="Put the Mimimum Lifespan"
          value={formulario.lifespanMin}
          onChange={setDataHandler}
        />
        <div className="error">{errors?.lifespanMin}</div>
        <h2 className="bt1">MAXIMUM LIFESPAN</h2>
        <input
          className="Input"
          type="text"
          name="lifespanMax"
          autoComplete="off"
          value={formulario.lifespanMax}
          placeholder="Put the Maximum Lifespan"
          onChange={setDataHandler}
        />
        <div className="error">{errors.lifespanMax}</div>
        <h2 className="bt1">TEMPERAMENT</h2>
        <input
          className="Input"
          type="text"
          name="temperament"
          autoComplete="off"
          placeholder="Search Temperament"
          onChange={submitInput}
        />
        <div className="error">{errors.temperament}</div>
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
