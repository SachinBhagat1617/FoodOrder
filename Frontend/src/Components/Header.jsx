import React from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-auto md:h-[34vw] m-[30px] md:m-[60px] bg-green-300 rounded-3xl overflow-hidden md:flex">
      <div className="md:w-1/2 m-4 p-4 flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Order Your Food Here
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with finest ingredients and culinary expertise. Our mission is
          to satisfy your cravings and elevate your dining experience, one
          delicious meal at a time.
        </p>
        <button className=" w-32 rounded-lg border-2 border-gray-500 py-2 px-4 text-white bg-transparent hover:bg-gray-500 hover:text-green-300 transition duration-300">
          <Link to="/food-menu">View Menu</Link>
        </button>
      </div>
      <div className="md:w-1/2 relative">
        <img
          src={assets.header_img}
          alt=""
          className="h-auto md:h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;
