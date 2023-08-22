import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHome, AiOutlineArrowRight } from "react-icons/ai";

import GenerationButtons from "./GenerationButtons";
import PokemonButton from "./PokemonButton";
import Welcome from "./Welcome";
import PokemonCard from "./PokemonCard";
import { generations } from "../helpers/api";
import PokemonContext from "../store/pokemon-context";
import PokemonList from "./PokemonList";
import FullPokemonList from "./FullPokemonList";
import AuthContext from "../store/auth-context";
import PokedexLogo from '../assets/pokedex.png'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [currentPokemon, setcurrentPokemon] = useState({
    id: null,
    name: null,
    abilities: [],
    moves: [],
    images: [],
    stats: [],
    types: [],
  });
  const pokemonCtx = useContext(PokemonContext);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const getPokemon = async (gen) => {
    setShowHome(true);
    setDisplayCard(false);
    const response = await axios.get(generations[gen]);
    setPokemons(response.data.results);
    pokemonCtx.addGlobalPokemons(response.data.results);
  };

  const filteredPokemon = (pokemonList, query) => {
    if (!query) return pokemonList;
    return pokemonList.filter(
      (p) => p.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  };

  const renderCard = async (pokemon) => {
    setShowAll(false);
    setShowHome(false);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const data = res.data;

    setcurrentPokemon({
      id: data.id,
      name: data.name,
      abilities: data.abilities,
      moves: data.moves.slice(0, 4),
      images: `https://www.pkparaiso.com/imagenes/xy/sprites/animados/${pokemon.name}.gif`,
      stats: data.stats,
      types: data.types,
      nickName: pokemon.nickName,
    });
    setDisplayCard(true);
  };

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await axios.get(generations["gen1"]);
      setPokemons(response.data.results);
      pokemonCtx.addGlobalPokemons(response.data.results);
      if (isLoggedIn) {
        const email = localStorage.getItem('email').replace(/[@.]/g, '');

        const res = await axios.get(`https://mail-box-client-a8037-default-rtdb.firebaseio.com/poke${email}.json`);
        if(res.data){
          Object.entries(res.data).map(([key, value]) => {
          pokemonCtx.addUserPokemon({
            ...value,
            _id: key
          })
        })
        }
        
      }
    };
    getPokemonData();
  }, [isLoggedIn]);

  const showHomeHandler = () => {
    setShowAll(false);
    setShowHome(false)
    setDisplayCard(false);
  };

  const showAllHandler = () => {
    setShowAll(true);
    setShowHome(false);
    setDisplayCard(false);
  };

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-row items-center justify-center">
          <div
            className={`bg-[#ff0050] h-[600px] w-[300px] rounded-50 md:rounded-l-50 md:rounded-r-none flex flex-col border border-r-[2px] border-black ${
              showHome ? "z-40" : "z-30"
            } md:z-40`}
            style={{ boxShadow: "5px 0 10px -2px #4f045a" }}
          >
            <GenerationButtons onClick={getPokemon} />
            <div
              className="h-[60px] border-b-2 border-black flex relative items-center justify-center font-serif text-center font-bold text-3xl  text-white p-1"
              style={{ boxShadow: "5px 10px 10px -5px #4f045a" }}
            >
              <img src={PokedexLogo} alt="pokedex" className="text-center h-full" />
              <AiOutlineArrowRight className="absolute right-5 md:hidden text-lg" onClick={showHomeHandler}/>
            </div>
            <div
              className="border-2 border-black border-t-0 h-[500px] mx-4 shadow-inner"
              style={{ boxShadow: "inset 0 0 7px #4f045a" }}
            >
              <div className="h-[300px] mx-[15px] mt-[30px] bg-[#f1f5e6] border border-black rounded-xl">
                <div className="h-10 text-center mt-3 ">
                  <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#f1f5e6] relative border-b-2 border-black"
                    placeholder="Search.."
                    style={{ zIndex: 170 }}
                  />
                </div>
                <div
                  className="h-[220px] flex flex-col mx-2 border-2 border-black overflow-scroll"
                  style={{
                    background: `repeating-linear-gradient(45deg, #14daff, #14daff 60px, #14eaff 60px, #14eaff 120px)`,
                  }}
                >
                  {filteredPokemon(pokemons, searchQuery).length !== 0 ? (
                    filteredPokemon(pokemons, searchQuery).map((pokemon) => (
                      <PokemonButton
                        key={pokemon.name}
                        name={pokemon.name}
                        renderCard={renderCard}
                        pokemon={pokemon}
                      />
                    ))
                  ) : (
                    <p>No Results.</p>
                  )}
                </div>
              </div>
              <PokemonList onClick={renderCard} onShowAll={showAllHandler} />
            </div>
          </div>
          <div
            className={`bg-[#ff0050] h-[600px] absolute md:relative w-[300px] rounded-50 md:rounded-r-50 md:rounded-l-none flex flex-col border border-r-[2px] border-black ${
              !showHome ? "z-40" : "z-30"
            } md:z-30`}
          >
            <AiOutlineHome
              className="hidden md:block m-3 absolute hover:cursor-pointer"
              onClick={showHomeHandler}
            />
            <AiOutlineHome
              className="mt-3 absolute left-[50%] md:hidden text-center hover:cursor-pointer"
              onClick={() => setShowHome(true)}
            />

            {displayCard && (
              <PokemonCard currentPokemon={currentPokemon} showAll={showAll} />
            )}
            {!displayCard && !showAll && <Welcome />}
            {showAll && <FullPokemonList onClick={renderCard} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Pokedex;
