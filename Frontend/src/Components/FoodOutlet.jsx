import React, { useEffect } from "react";
import ExploreMenu from "./ExploreMenu";
import FoodMenu from "./FoodMenu";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/CategorySlice";

const FoodOutlet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory("all"));
  }, [dispatch]);

  return (
    <div>
      <ExploreMenu />
      <FoodMenu />
    </div>
  );
};

export default FoodOutlet;
