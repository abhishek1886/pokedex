import { Fragment } from "react";
import Pokedex from "./components/Pokedex";
import WildPokemon from "./components/WildPokemon";

function App() {
  return (
    <Fragment>
      <Pokedex />
      <WildPokemon />
    </Fragment>
  );
}

export default App;
