import { createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import ThunkMiddlewere from "redux-thunk";
import rootReducer from "./reducer/reducer";
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ThunkMiddlewere))
);
export default store;
