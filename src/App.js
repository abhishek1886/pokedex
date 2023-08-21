import React from "react";
import Pokedex from "./components/Pokedex";
import WildPokemon from "./components/WildPokemon";
import BackgroundImage from "./assets/background.jpg";
import Header from "./components/Header";
import LogIn from "./components/auth/LogIn";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Pokedex />
            <WildPokemon />
          </Route>

          <Route path="/login" exact>
            <LogIn />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
