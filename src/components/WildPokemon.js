import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

import PokemonContext from "../store/pokemon-context";
import PokemonModal from "./PokemonModal";

const WildPokemon = () => {
  const pokemonCtx = useContext(PokemonContext);
  const [display, setDisplay] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [modalDisplay, setModalDisplay] = useState(false);
  console.log("wildPokemon");

  useEffect(() => {
    const delay = Math.floor(Math.random() * 20) + 10;

    const timeoutID = setInterval(() => {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
      }, 5000);
    }, delay * 1000);
    console.log(timeoutID);

    return () => {
      console.log(timeoutID);
      clearInterval(timeoutID);
    };
  }, []);

  const grassClickHandler = async () => {
    setDisplay(false);
    console.log("grass clicked");
    const index = Math.floor(
      Math.random() * pokemonCtx.globalPokemonList.length
    );
    console.log(index);
    const pokemon = pokemonCtx.globalPokemonList[index];
    console.log(pokemon);

    const data = await axios.get(pokemon.url);
    console.log(data);
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
          className="fixed bottom-0 right-0 hover:cursor-pointer "
          onClick={grassClickHandler}
          style={{ zIndex: 150 }}
        >
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
