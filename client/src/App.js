import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dog from "./components/Dogs";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import Intro from "./components/Intro";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Dogs</h1>
        <Switch>
          <Route path="/makedog">
            <Formulario />
          </Route>
          <Route path="/dogs/:idDogs">
            <Dog />
          </Route>
          <Route path="/dogs">
            <Home />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
