import React from "react";

const Header = () => {
  return (
    <header className=" bg-[#14eaff] p-2 px-5 md:px-20 mb-10 flex justify-between">
      <div className="text-2xl md:text-4xl font-serif font-extrabold">PokéDex</div>
      <button className="border-black border-2 px-2 py-0 text-sm rounded-xl hover:bg-[#14daff]">Log In</button>
    </header>
  );
};

export default Header;
