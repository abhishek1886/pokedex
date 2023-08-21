import React, { useContext } from "react";

import PokemonContext from "../store/pokemon-context";
import AuthContext from "../store/auth-context";

const PokemonList = (props) => {
  const pokemonCtx = useContext(PokemonContext);
  const authCtx = useContext(AuthContext);

  let pokemonList = [];

  if (pokemonCtx.userPokemonList.length > 0 ) {
    pokemonList = pokemonCtx.userPokemonList.slice(0, 8).map((pokemon) => (
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
    if(!authCtx.isLoggedIn){
      pokemonList = [];
    }
  }

  return (
    <div className="">
      <p className="text-white text-l font-bold font-serif text-center my-2">
        Your Pokemons!
      </p>
      <div className="h-[115px] border relative border-black rounded-xl mx-2">
        <ul className=" grid grid-cols-4 px-2 py-1 gap-1">
          {pokemonList.length > 0 && pokemonList}
          {authCtx.isLoggedIn && <button
            className="text-xs absolute bottom-0 bg-[#14daff] rounded-md rounded-ee-lg px-2 right-0"
            onClick={() => props.onShowAll()}
          >
            Show all
          </button>}
        </ul>
        {authCtx.isLoggedIn && pokemonList.length === 0 &&  (
          <p className="p-2 text-xs">
            You dont have any pokemons in your inventory.
          </p>
        )}
        {!authCtx.isLoggedIn && <p className="text-center mt-7">You have not logged in yet.</p>}
      </div>
    </div>
  );
};

export default PokemonList;
