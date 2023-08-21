import React from "react";

const PokemonButton = (props) => {
  const {name, renderCard, pokemon} = props;
  return (
    <button
      key={name}
      onClick={() => renderCard(pokemon)}
      className="py-2 text-2xl text-white font-serif capitalize relative"
      style={{zIndex: 110}}
    >
      {name}
    </button>
  );
};

export default PokemonButton;
