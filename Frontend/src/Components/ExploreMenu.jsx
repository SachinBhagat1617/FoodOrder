import React from "react";
import { menu_list } from "../Food Del Frontend Assets/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/CategorySlice";

const ExploreMenu = () => {
  const category = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch()
  
  console.log(category);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="text-center text-2xl font-semibold mb-8">
        Explore our Menu here
      </div>
      <div className="flex gap-8 overflow-x-auto pb-4 -mx-4 scrollbar-hide">
        {menu_list.map((item, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <img
              onClick={() => dispatch(setCategory(item.menu_name))}
              src={item.menu_image}
              alt=""
            />
            <p className="text-lg font-medium">{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
