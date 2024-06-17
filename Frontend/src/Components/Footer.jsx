import React from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";

const Footer = () => {
  return (
    <div className="bg-slate-600 text-white">
      <div className="flex justify-center py-6">
        <img className="h-[100px]" src={assets.logo} alt="Logo" />
      </div>
      <div className="p-5 md:flex md:justify-around">
        <p className="mb-6 md:mb-0 md:w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
          odit? Porro recusandae incidunt autem, dolores culpa debitis delectus
          sed, illum, ducimus distinctio accusantium inventore a ratione soluta
          fuga eos nemo quod? Aperiam saepe labore explicabo officiis, illo
          iusto laborum ipsa numquam. Obcaecati alias explicabo debitis, nihil
          ipsa doloribus nesciunt fugit!
        </p>
        <div className="mb-6 md:mb-0">
          <h1 className="font-bold mb-2">COMPANY</h1>
          <ul>
            <li className="mb-1">Home</li>
            <li className="mb-1">About us</li>
            <li className="mb-1">Delivery</li>
            <li className="mb-1">Privacy policy</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold mb-2">GET IN TOUCH</h1>
          <ul>
            <li className="mb-1">+919509152990</li>
            <li className="mb-1">contactbhagatsachin@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-5 py-6">
        <img src={assets.facebook_icon} alt="Facebook" className="h-6 w-6" />
        <img src={assets.linkedin_icon} alt="LinkedIn" className="h-6 w-6" />
        <img src={assets.twitter_icon} alt="Twitter" className="h-6 w-6" />
      </div>
      <div className="text-center py-4 border-t border-gray-400">
        <p>© {new Date().getFullYear()} Sachin Bhagat. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
