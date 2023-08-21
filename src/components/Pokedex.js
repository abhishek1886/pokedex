import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

import GenerationButtons from "./GenerationButtons";
import PokemonButton from "./PokemonButton";
import Welcome from "./Welcome";
import PokemonCard from "./PokemonCard";
import { generations } from "../helpers/api";
import WildPokemon from "./WildPokemon";
import PokemonContext from "../store/pokemon-context";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const getPokemon = async (gen) => {
    const response = await axios.get(generations[gen]);
    console.log(response);
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
    console.log(pokemon);
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
    });
    setDisplayCard(true);
  };

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await axios.get(generations["gen1"]);
      setPokemons(response.data.results);
      pokemonCtx.addGlobalPokemons(response.data.results)
    };
    getPokemonData();
  }, []);

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div
            className="bg-[#ff0050] h-[600px] w-[300px] rounded-l-[50px] flex flex-col border border-r-[2px] border-black"
            style={{ boxShadow: "5px 0 10px -2px #4f045a", zIndex: 100 }}
          >
            <GenerationButtons onClick={getPokemon} />
            <div
              className="h-[60px] border-b-2 border-black text-center font-bold text-3xl  text-white pt-2"
              style={{ boxShadow: "5px 10px 10px -5px #4f045a" }}
            >
              Pokedex
            </div>
            <div
              className="border-2 border-black border-t-0 h-[500px] mx-4 shadow-inner"
              style={{ boxShadow: "inset 0 0 7px #4f045a" }}
            >
              <div className="h-[300px] mx-[15px] my-[30px] bg-[#f1f5e6] border border-black rounded-xl">
                <div className="h-10 text-center mt-3 ">
                  <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#f1f5e6] border-b-2 border-black"
                    placeholder="Search.."
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
            </div>
          </div>
          <div className="bg-[#ff0050] h-[600px] relative w-[300px] rounded-r-[50px] flex flex-col border border-r-[2px] border-black">
            {displayCard ? (
              <PokemonCard currentPokemon={currentPokemon} />
            ) : (
              <Welcome />
            )}
          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default Pokedex;
