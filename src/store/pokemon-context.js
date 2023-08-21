import { createContext, useState } from "react";

const PokemonContext = createContext({
  globalPokemonList: [],
  addGlobalPokemons: (data) => {},
  userPokemonList: [],
  addUserPokemon: (pokemon) => {},
  removeUserPokemon: (id) => {},
  isDataFetched: null
});

export const PokemonContextProvider = (props) => {
  const [globalPokemonList, setGlobalPokemonList] = useState([]);
  const [userPokemonList, setUserPokemonList] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const addGlobalPokemons = (data) => {
    setGlobalPokemonList(data);
  };

  const addUserPokemon = (pokemon) => {
    setUserPokemonList((prev) => [pokemon, ...prev]);
  };

  const removeUserPokemon = (id) => {
    const updatedList = userPokemonList.filter(pokemon => pokemon._id !== id);
    setUserPokemonList(updatedList);
    setIsDataFetched(true);
  }

  const value = {
    globalPokemonList,
    addGlobalPokemons,
    userPokemonList,
    addUserPokemon,
    removeUserPokemon,
    isDataFetched
  };
  return (
    <PokemonContext.Provider value={value}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
