import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import {BsDot} from 'react-icons/bs';
import MovesTable from "./MovesTable";

const PokemonCard = (props) => {
  const { id, name, abilities, images, stats, types, moves, nickName } =
    props.currentPokemon;
  const [abilityDescriptions, setAbilityDescriptions] = useState([]);
  const [moveStats, setMoveStats] = useState([]);

  //fetching the ability of pokemon
  useEffect(() => {
    const getStats = async () => {
      const abilityList = await abilities.map(async (ability) => {
        const data = await axios.get(ability.ability.url);
        return data;
      });
      const data = await Promise.all(abilityList);
      const englishValues = data.map(
        (value) =>
          value.data.effect_entries.filter(
            (entry) => entry.language.name === "en"
          )[0].short_effect
      );
      setAbilityDescriptions(englishValues);
    };
    getStats();
  }, [abilities]);

  useEffect(() => {
    if (moveStats.length > 0) return;
    Promise.all(moves.slice(0, 4).map((move) => axios.get(move.move.url))).then(
      (values) => {
        setMoveStats(
          values.map((value) => ({
            name: value.data.name,
            damage_class: value.data.damage_class.name,
            accuracy: value.data.accuracy,
            power: value.data.power,
          }))
        );
      }
    );
  }, [moves, moveStats]);

  useEffect(() => {
    setAbilityDescriptions([]);
    setMoveStats([]);
  }, [id, setAbilityDescriptions, setMoveStats]);
  console.log(types);

  return (
    <div className="h-[550px] mx-5 mt-7 bg-[#f1f5e6] rounded-xl border-black border">
      <div className="text-center mt-3">
        <h1 className="capitalize font-serif text-3xl">{name}</h1>
        
        {types.map((pokemon) => (
          <span key={pokemon.type.name} className="capitalize px-1 text-sm font-sans">
            {pokemon.type.name}
          </span>
        ))}
      </div>
      <div
        className="h-[150px] m-2 mb-0 mt-3 border-2 border-black rounded-xl grid grid-cols-2 relative"
        style={{
          background: `repeating-linear-gradient(45deg, #14daff, #14daff 40px, #14eaff 40px, #14eaff 80px)`,
        }}
      >
        <div className="">
          <h1 className="text-white text-xl font-serif text-center">Stats</h1>
          <ul className="ml-2 font-serif">
            {stats.map((pokemon) => (
              <li className="text-xs text-black capitalize">
                {pokemon.stat.name}:{" "}
                <span className="text-white">{pokemon.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
        {nickName && <h3 className="absolute top-0 text-center font-serif font-bolder text-white capitalize text-l">{nickName}</h3>}
          <img className="w-full p-3" src={images} alt={name} width="100%" />
        </div>
        <div className="absolute bottom-0 left-48 font-bold text-xs font-serif float float-right">ID:{id}</div>
      </div>
      <div className="mt-0">
        <h2 className="text-center text-lg font-serif">Abilities</h2>
        {abilities.slice(0,2).map((pokemon, i) => (
        <p className="inline-block text-xs font-serif " key={i}><BsDot className="inline-block" />
          <span className="capitalize font-black">{pokemon.ability.name}</span> - {abilityDescriptions[i]}
        </p>
        ))}
      </div>
      <div className="pb-3 m-2 border-2 border-[#ff8945] rounded-2xl bg-[#faf139]">
        <p className="font-serif text-xl text-center">Moves</p>
        <MovesTable movesStats={moveStats} />
      </div>
    </div>
  );
};

export default PokemonCard;
