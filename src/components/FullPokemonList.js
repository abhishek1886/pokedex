import React, { useContext } from "react";

import PokemonContext from "../store/pokemon-context";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import AuthContext from "../store/auth-context";

const FullPokemonList = (props) => {
  const pokemocCtx = useContext(PokemonContext);
  const authCtx = useContext(AuthContext);

  const deleteHandler = async (id) => {
    pokemocCtx.removeUserPokemon(id);
    const email = localStorage.getItem('email').replace(/[@.]/g, '');
    const res = await axios.delete(`https://mail-box-client-a8037-default-rtdb.firebaseio.com/poke${email}/${id}.json`)
  }

  let fullList = [];
  if (pokemocCtx.userPokemonList) {
    fullList = pokemocCtx.userPokemonList.map((pokemon) => (
      <div className="relative group" key={pokemon.id}>
        <li
          className="w-[100px] flex items-center group flex-col justify-center h-[100px] border border-[#faf139]"
          style={{
            background: `repeating-linear-gradient(45deg, #14daff, #14daff 10px, #14eaff 10px, #14eaff 20px)`,
          }}
          onClick={() => props.onClick(pokemon)}
        >
          <img
            className="h-full p-2"
            src={`https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name}.gif`}
            alt={pokemon.name}
          />
        </li>
        <p className="text-center font-serif">{pokemon.nickName}</p>
        <TiDeleteOutline className=" hidden absolute group-hover:block hover:cursor-pointer text-xl text-[#ff0f0f] top-0 right-4 md:right-2" onClick={() => deleteHandler(pokemon._id)} />
      </div>
    ));
  }
  if(!authCtx.isLoggedIn){
    fullList = [];
  }
  return (
    <div className="h-[500px] m-3 mt-12 rounded-2xl border overflow-scroll border-black p-3 bg-[#f1f5e6]">
      <ul className=" mt-2 grid pl-3 grid-cols-2 gap-1">{fullList}</ul>
    </div>
  );
};

export default FullPokemonList;
