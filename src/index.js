import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PokemonContextProvider } from "./store/pokemon-context";
import { AuthContextProvider } from "./store/auth-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <PokemonContextProvider>
        <App />
      </PokemonContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
