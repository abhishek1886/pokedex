import React, { useContext } from "react";

import { useHistory } from 'react-router-dom';
import AuthContext from "../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const buttonClickHandler = () => {
    if(authCtx.isLoggedIn) {
      authCtx.logout();
    } else {
      history.push('/login');
    }
  }

  return (
    <header className=" hover:bg-[#14eaff] p-2 px-5 md:px-20 mb-5 flex justify-between">
      <div className="text-2xl md:text-4xl font-serif hover:cursor-pointer font-extrabold" onClick={() => history.push('/')}>PokéDex</div>
      <button className="border-black border-2 px-2 py-0 text-sm rounded-xl hover:bg-[#14daff]" onClick={buttonClickHandler}>{authCtx.isLoggedIn ? 'Log Out' : 'Log In'}</button>
    </header>
  );
};

export default Header;
