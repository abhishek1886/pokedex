import { createContext, useState } from "react";

const PokemonContext = createContext({
  globalPokemonList: [],
  addGlobalPokemons: (data) => {},
  userPokemonList: [],
  addUserPokemon: (pokemon) => {}
});

export const PokemonContextProvider = (props) => {
  const [globalPokemonList, setGlobalPokemonList] = useState([]);
  const [userPokemonList, setUserPokemonList] = useState([]);

  const addGlobalPokemons = (data) => {
    setGlobalPokemonList(data);
  };

  const addUserPokemon = (pokemon) => {
    setUserPokemonList((prev) => [pokemon, ...prev]);
  };

  const value = {
    globalPokemonList,
    addGlobalPokemons,
    userPokemonList,
    addUserPokemon
  };
  return (
    <PokemonContext.Provider value={value}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
