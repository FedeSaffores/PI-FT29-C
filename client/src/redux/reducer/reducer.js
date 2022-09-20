import { ordAlf, ordweight } from "../../components/order/order";
import {
  GET_DOGS,
  GET_DETAIL,
  GET_TEMPERAMENTOS,
  GET_DOG_NAME,
  ORD_ALF_REV,
  ORD_MAYOR_PESO,
  ORD_ALF,
  ORD_MENOR_PESO,
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
    case ORD_ALF: {
      return {
        ...state,
        Dogs: state.Dogs.slice().sort(ordAlf),
      };
    }

    case ORD_ALF_REV: {
      return {
        ...state,
        Dogs: state.Dogs.slice().sort(ordAlf).reverse(),
      };
    }
    case ORD_MAYOR_PESO: {
      return {
        ...state,
        Dogs: state.Dogs.slice().sort(ordweight),
      };
    }
    case ORD_MENOR_PESO: {
      return {
        ...state,
        Dogs: state.Dogs.slice().sort(ordweight).reverse(),
      };
    }

    default:
      return state;
  }
};
export default rootReducer;
