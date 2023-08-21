import React, { Fragment, useContext, useRef, useState } from "react";

import ReactDOM from "react-dom";
import Success from "../assets/success.png";
import Pending from "../assets/pending.gif";
import PokemonContext from "../store/pokemon-context";

const arr = [false, false, true, false, false, true];

const Backdrop = (props) => {
  return (
    <div
      className="h-screen fixed inset-0 bg-[#808080] bg-opacity-0 backdrop-contrast-75 backdrop-blur-sm"
      style={{ zIndex: 200 }}
      onClick={() => props.onClick()}
    />
  );
};

const ErrorBackdrop = (props) => {
  return (
    <div
      className="h-screen fixed inset-0 bg-[#ff0f0f] bg-opacity-50 backdrop-contrast-75 backdrop-blur-sm"
      style={{ zIndex: 300 }}
    />
  );
};

const PokemonOverlay = (props) => {
  const [catching, setCatching] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef();
  const pokemonCtx = useContext(PokemonContext);
  const [input, setInput] = useState(false);

  const catchHandler = () => {
    setCatching(true);
    setFailed(false);

    setTimeout(() => {
      const index = Math.floor(Math.random() * 6);
      console.log(arr[index], index);
      if (arr[index]) {
        console.log("caught");
        setCatching(false);

        setSuccess(true);
      } else {
        props.onFail(true);
        setTimeout(() => {
          props.onFail(false);
          setFailed(true);
          setCatching(false);
        }, 1000);
      }
    }, 3000);
  };

  const addPokemon = (e) => {
    e.preventDefault();

    if(inputRef.current.value.length === 0) {
      setInput(true);
      return;
    }

    const pokemon = {
      ...props.pokemon,
      nickName: inputRef.current.value,
      id: Math.random().toString()
    }
    console.log(pokemon);
    pokemonCtx.addUserPokemon(pokemon);
    setInput(false);
    props.onClick();
  };

  return (
    <div
      className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
      style={{ zIndex: 350 }}
    >
      {!catching && (
        <p className="text-xl md:text-4xl font-serif font-extrabold text-center mb-3">{`It's ${props.pokemon.name}!`}</p>
      )}
      <div className="flex justify-center items-center flex-col h-[300px]">
        {!success && !catching && (
          <img
            width="100%"
            src={`https://www.pkparaiso.com/imagenes/xy/sprites/animados/${props.pokemon.name}.gif`}
          />
        )}
        <div className="h-[100px] flex items-end flex-col justify-center">
          {success && <img src={Success} width="150px" />}
          {catching && <img width="100px" src={Pending} />}
          {catching && (
            <p className=" relative h-[20px] text-center text-xl font-serif font-semibold">
              Catching..
            </p>
          )}
        </div>
      </div>
      {failed && (
        <p className="text-center font-bold text-red-950 ">
          Failed to catch. Try again!
        </p>
      )}
      {!success && !catching && (
        <div className="flex gap-2 items-center mt-3">
          <button
            className="px-5 py-2 font-bold text-xl font-serif border-2 border-black rounded-md hover:bg-[#14daff]"
            onClick={catchHandler}
          >
            Catch!
          </button>
          <button
            className="px-5 py-2 font-bold text-xl font-serif border-2 border-black rounded-md hover:bg-[#14daff]"
            onClick={() => props.onClick()}
          >
            Ignore
          </button>
        </div>
      )}
      {success && (
        <div className="bg-opacity-50 mt-5 flex flex-col justify-center items-center">
          <p className="text-md font-serif font-bold text-center mb-5 text-green-500">
            Successfully Caught!!!
          </p>

          <input
            className="bg-opacity-50 bg-gray-600 p-4 rounded-lg"
            placeholder="Enter a Nick Name..."
            required
            ref={inputRef}
          />
          {input && <p>enter a name</p>}
          <button className="px-5 py-2 mt-3 border-black border-2 hover:bg-[#14daff] font-serif font-bold rounded-xl text-sm" onClick={addPokemon}>
            Add Pokemon
          </button>
        </div>
      )}
    </div>
  );
};

const PokemonModal = (props) => {
  const [failed, setFailed] = useState(false);

  console.log("modal", props.pokemon);
  const position = document.getElementById("backdrop");
  return (
    <Fragment>
      {!failed &&
        ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, position)}
      {failed && ReactDOM.createPortal(<ErrorBackdrop />, position)}
      {ReactDOM.createPortal(
        <PokemonOverlay
          pokemon={props.pokemon}
          onClick={props.onClick}
          onFail={setFailed}
        />,
        position
      )}
    </Fragment>
  );
};

export default PokemonModal;
