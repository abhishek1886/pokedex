import { createContext, useContext, useState } from "react";
import PokemonContext from "./pokemon-context";

const AuthContext = createContext({
  isLoggedIn: null,
  email: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const pokemocCtx = useContext(PokemonContext);
  const login = ({ email, token }) => {
    setEmail(email);
    setEmail(token);
    setIsLoggedin(true);

    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setIsLoggedin(false);
    pokemocCtx.removeUserPokemon('all');

    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const value = {
    email: email,
    token: token,
    isLoggedIn: isLoggedin,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
