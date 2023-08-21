import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PokemonContextProvider } from "./store/pokemon-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PokemonContextProvider>
    <App />
  </PokemonContextProvider>
);
