import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Sidebar />
      <div className="flex-grow">
        <hr className="md:hidden mb-4" />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
