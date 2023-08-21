import { createContext, useState } from "react";

const PokemonContext = createContext({
  globalPokemonList: [],
  addGlobalPokemons: (data) => {}
});

export const PokemonContextProvider = (props) => {
  const [globalPokemonList, setGlobalPokemonList] = useState([]);

  const addGlobalPokemons = (data) => {
    setGlobalPokemonList(data);
  }
  
  const value = {
    globalPokemonList,
    addGlobalPokemons
  }
  return (
    <PokemonContext.Provider value={value}>{props.children}</PokemonContext.Provider>
  )
}

export default PokemonContext;