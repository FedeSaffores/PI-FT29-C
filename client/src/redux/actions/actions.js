import axios from "axios";
import {
  GET_DOGS,
  GET_DETAIL,
  GET_DOG_NAME,
  GET_TEMPERAMENTOS,
} from "./actionsNames";

export function getDogs() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/dogs/");
    dispatch({ type: GET_DOGS, payload: res.data });
  };
}
export function getDetail(id) {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/dogs/${id}`);
    dispatch({ type: GET_DETAIL, payload: res.data });
  };
}
export function getDogsByName(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
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
        `http://localhost:3001/temperamentos/?name=${name}`
      );
      dispatch({ type: GET_TEMPERAMENTOS, payload: res.data });
    } catch (error) {
      throw error;
    }
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
