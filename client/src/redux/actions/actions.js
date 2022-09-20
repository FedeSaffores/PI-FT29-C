import axios from "axios";
import {
  GET_DOGS,
  GET_DETAIL,
  GET_DOG_NAME,
  GET_TEMPERAMENTOS,
  ORD_ALF_REV,
  ORD_ALF,
  ORD_MAYOR_PESO,
  ORD_MENOR_PESO,
} from "./actionsNames";

export function getDogs() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/dogs/");
    dispatch({ type: GET_DOGS, payload: res.data });
  };
}
export function getDetail(idDogs) {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/dogs/${idDogs}`);
    dispatch({ type: GET_DETAIL, payload: res.data });
  };
}
export function getDogsByName(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/dogs/name?name=${name}`
      );
      dispatch({ type: GET_DOG_NAME, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_DOG_NAME, payload: [] });
      throw error;
    }
  };
}
export function getTemperamentos(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/temperamentos/search?name=${name}`
      );
      dispatch({ type: GET_TEMPERAMENTOS, payload: res.data });
    } catch (error) {
      throw error;
    }
  };
}

export function ordAlf() {
  return {
    type: ORD_ALF,
  };
}
export function ordRevAlf() {
  return {
    type: ORD_ALF_REV,
  };
}
export function ordXMayorPeso() {
  return {
    type: ORD_MAYOR_PESO,
  };
}
export function ordXMenorPeso() {
  return {
    type: ORD_MENOR_PESO,
  };
}
export function createDogs(dog) {
  return async function () {
    try {
      const newRecipe = await axios.post("http://localhost:3001/mekeDogs", dog);
    } catch (err) {
      throw err;
    }
  };
}
