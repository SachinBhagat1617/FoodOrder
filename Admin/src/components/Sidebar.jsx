import React from "react";
import { assets } from "../../../Frontend/src/Food Del Frontend Assets/assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="p-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `w-full sm:w-40 flex items-center p-2 mb-4 border rounded-lg transition duration-300 cursor-pointer ${
            isActive
              ? "border-green-500 bg-green-100"
              : "border-slate-500 hover:bg-slate-100"
          }`
        }
      >
        <img className="h-6 mr-2" src={assets.add_icon_white} alt="Add Icon" />
        <h2 className="text-sm sm:text-base font-medium">Add Items</h2>
      </NavLink>
      <NavLink
        to="/listItem"
        className={({ isActive }) =>
          `w-full sm:w-40 flex items-center p-2 mb-4 border rounded-lg transition duration-300 cursor-pointer ${
            isActive
              ? "border-green-500 bg-green-100"
              : "border-slate-500 hover:bg-slate-100"
          }`
        }
      >
        <img className="h-6 mr-2" src={assets.add_icon_white} alt="List Icon" />
        <h2 className="text-sm sm:text-base font-medium">List Items</h2>
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `w-full sm:w-40 flex items-center p-2 mb-4 border rounded-lg transition duration-300 cursor-pointer ${
            isActive
              ? "border-green-500 bg-green-100"
              : "border-slate-500 hover:bg-slate-100"
          }`
        }
      >
        <img
          className="h-6 mr-2"
          src={assets.add_icon_white}
          alt="Orders Icon"
        />
        <h2 className="text-sm sm:text-base font-medium">Orders</h2>
      </NavLink>
    </div>
  );
};

export default Sidebar;
