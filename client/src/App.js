import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Dogs</h1>
        <Switch path="/dogs">
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
