import React, { Fragment } from "react";

const Welcome = () => {
  return (
    <Fragment>
      <div className="mt-12 text-3xl font-serif text-white text-center">
        Welcome
      </div>
      <p className="text-white font-serif px-5 text-center">This is a pokedex built in React. Log In to catch pokemons in the wild!</p>
    </Fragment>
  );
};

export default Welcome;
