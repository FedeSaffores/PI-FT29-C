import {
  GET_DOGS,
  GET_DETAIL,
  GET_TEMPERAMENTOS,
  GET_DOG_NAME,
} from "../actions/actionsNames";
const inicialState = {
  Dogs: [],
  Temperamentos: [],
};
const rootReducer = (state = inicialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS: {
      return {
        ...state,
        Dogs: payload,
      };
    }
    case GET_DETAIL: {
      return {
        ...state,
        DogsDetail: payload,
      };
    }
    case GET_DOG_NAME: {
      return {
        ...state,
        Dogs: payload,
      };
    }
    case GET_TEMPERAMENTOS: {
      return {
        ...state,
        Temperamentos: payload,
      };
    }
    default:
      return state;
  }
};
export default rootReducer;
