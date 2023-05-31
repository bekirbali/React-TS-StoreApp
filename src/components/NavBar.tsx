import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between h-[50px] text-white items-center bg-gray-500 px-5 text-lg">
      <h3 className="font-medium text-[2rem]">Store</h3>
      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </div>
  );
};

export default NavBar;
