import React from "react";
import Header from "../../Components/Header";
import ExploreMenu from "../../Components/ExploreMenu";
import FoodMenu from "../../Components/FoodMenu";

const Home = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodMenu />
    </div>
  );
};

export default Home;
