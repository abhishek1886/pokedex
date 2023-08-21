import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

import PokemonContext from "../store/pokemon-context";
import PokemonModal from "./PokemonModal";

const WildPokemon = () => {
  const pokemonCtx = useContext(PokemonContext);
  const [display, setDisplay] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    const delay = Math.floor(Math.random() * 20) + 10;

    const timeoutID = setInterval(() => {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
      }, 5000);
    }, delay * 1000);

    return () => {
      clearInterval(timeoutID);
    };
  }, []);

  const grassClickHandler = async () => {
    setDisplay(false);
    const index = Math.floor(
      Math.random() * pokemonCtx.globalPokemonList.length
    );
    const pokemon = pokemonCtx.globalPokemonList[index];

    const data = await axios.get(pokemon.url);
    setPokemon(pokemon);
    setModalDisplay(true);
  };

  const modalClickHandler = () => {
    setModalDisplay(false);
    setDisplay(true);
  };

  return (
    <Fragment>
      {display && (
        <div
          className="fixed bottom-0 w-[150px] right-0 hover:cursor-pointer group"
          onClick={grassClickHandler}
          style={{ zIndex: 150 }}
        >
          <p className="hidden group-hover:block text-xs border-2 border-[black] p-2 m-3 rounded-2xl">
            Something is hiding behind this bush click to see what is it!
          </p>
          <img
            src="https://i.pinimg.com/originals/6b/2c/8e/6b2c8e8c2e08ee9604f002c6da595939.gif"
            width="150px"
          />
        </div>
      )}
      {modalDisplay && (
        <PokemonModal pokemon={pokemon} onClick={modalClickHandler} />
      )}
    </Fragment>
  );
};

export default WildPokemon;
