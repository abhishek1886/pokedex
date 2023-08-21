import React, { Fragment } from "react";

const Welcome = () => {
  return (
    <Fragment>
      <div className="mt-12 text-3xl font-serif text-white text-center">
        Welcome
      </div>
      <p className="text-white font-serif px-5 text-center">This is a pokedex built in React. Log In to catch pokemons in the wild!</p>
      <p className="text-xs font-serif text-gray-400 text-center px-2 my-4">Tip: If you see some movement behind the bushes. Then check it out whats hidden behind the grass by clicking on it. It might just be a pokemon you've been wanting to catch</p>
      <p className="text-white font-serif px-5 text-center">Gotta Catch em All!</p>
    </Fragment>
  );
};

export default Welcome;
