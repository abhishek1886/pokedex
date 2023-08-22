import { createContext, useState } from "react";

const PokemonContext = createContext({
  globalPokemonList: [],
  addGlobalPokemons: (data) => {},
  userPokemonList: [],
  addUserPokemon: (pokemon) => {},
  removeUserPokemon: (id) => {},
  isDataFetched: null,
});

export const PokemonContextProvider = (props) => {
  const [globalPokemonList, setGlobalPokemonList] = useState([]);
  const [userPokemonList, setUserPokemonList] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const addGlobalPokemons = (data) => {
    setGlobalPokemonList(data);
  };

  const addUserPokemon = (pokemon) => {
    setIsDataFetched(true);
    setUserPokemonList((prev) => [pokemon, ...prev]);
  };

  const removeUserPokemon = (id) => {
    if (id === "all") {
      console.log('logout');
      setUserPokemonList([]);
    } else {
      const updatedList = userPokemonList.filter(
        (pokemon) => pokemon._id !== id
      );
      setUserPokemonList(updatedList);
    }
    console.log('outer');
  };

  const value = {
    globalPokemonList,
    addGlobalPokemons,
    userPokemonList,
    addUserPokemon,
    removeUserPokemon,
    isDataFetched,
  };
  return (
    <PokemonContext.Provider value={value}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
