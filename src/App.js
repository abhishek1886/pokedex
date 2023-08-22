import React, { useContext, useEffect } from "react";
import Pokedex from "./components/Pokedex";
import WildPokemon from "./components/WildPokemon";
import BackgroundImage from "./assets/background.jpg";
import Header from "./components/Header";
import LogIn from "./components/auth/LogIn";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (token && email) {
    authCtx.login({ email, token });
  }}, [authCtx])

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Pokedex />
            <WildPokemon />
          </Route>

          {!authCtx.isLoggedIn && <Route path="/login" exact>
             <LogIn />
          </Route>}
          {!authCtx.isLoggedIn && <Route path="/signup" exact>
          <SignUp />
          </Route>}
          {!authCtx.isLoggedIn && <Route path="/forgotpassword" exact>
          <ForgotPassword />
          </Route>}
          <Route path="*"><Redirect to='/' /></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
