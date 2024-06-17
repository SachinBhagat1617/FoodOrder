import React from "react";
import { assets } from "../../../Frontend/src/Food Del Frontend Assets/assets/assets";

const Navbar = () => {
  return (
    <div className="px-4 sm:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <div>
            <img className="h-10 sm:h-16" src={assets.logo} alt="Logo" />
            <h2 className="ml-2 text-lg sm:text-xl font-semibold ">
              Admin Panel
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="h-8 sm:h-10 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile Icon"
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
