import React, { useContext, useEffect, useState } from "react";
import PokemonContext from "../store/pokemon-context";

const WildPokemon = () => {
  const pokemonCtx = useContext(PokemonContext);
  const [display, setDisplay] = useState(false);
  console.log("wildPokemon");

  useEffect(() => {
    const delay = Math.floor(Math.random() * 5);

    const timeoutID = setTimeout(() => {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false)
      }, 5000);
    }, delay * 1000);
    console.log(timeoutID);

    return () => {
      console.log(timeoutID);
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    display && (
      <div className="fixed bottom-0 right-0">
        <img
          src="https://i.pinimg.com/originals/6b/2c/8e/6b2c8e8c2e08ee9604f002c6da595939.gif"
          width="150px"
        />
      </div>
    )
  );
};

export default WildPokemon;
