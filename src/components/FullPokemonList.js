import React, { useContext } from "react";
import PokemonContext from "../store/pokemon-context";

const FullPokemonList = (props) => {
  const pokemocCtx = useContext(PokemonContext);

  let fullList = [];
  if (pokemocCtx.userPokemonList) {
    fullList = pokemocCtx.userPokemonList.map((pokemon) => (
      <li
        className="w-[50px] flex items-center group flex-col justify-center h-[50px] border border-[#faf139]"
        style={{
          background: `repeating-linear-gradient(45deg, #14daff, #14daff 10px, #14eaff 10px, #14eaff 20px)`,
        }}
        key={pokemon.id}
        onClick={() => props.onClick(pokemon)}
      >
        <p className="hidden absolute text-xs group-hover:block font-serif font-bold capitalize text-[#ff0050]">
          {pokemon.nickName}
        </p>
        <img
          className="h-full"
          src={`https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name}.gif`}
          alt={pokemon.name}
        />
      </li>
    ));
  }
  return (
    <div className="h-[500px] m-3 mt-12 rounded-2xl border overflow-scroll border-black p-3 bg-[#f1f5e6]">
      <ul className=" mt-2 grid grid-cols-4 gap-1">{fullList}</ul>
    </div>
  );
};

export default FullPokemonList;
