import { createContext, useState } from "react";

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

  const login = ({ email, token }) => {
    setEmail(email);
    setEmail(token);
    setIsLoggedin(true);

    localStorage.setItem("token");
    localStorage.setItem("email");
  };

  const logout = () => {
    setEmail("");
    setEmail("");
    setIsLoggedin(false);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const value = {
    email,
    token,
    isLoggedin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
