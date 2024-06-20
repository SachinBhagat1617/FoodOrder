import React, { useEffect, useState } from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseProduct,
  setFoodlist,
  setProductAdded,
} from "../utils/CategorySlice";
import axios from "axios";

const FoodMenu = () => {
  const category = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.categorySlice.url);
  const token = useSelector((state) => state.categorySlice.token);
  const foodlist = useSelector((state) => state.categorySlice.foodlist);
  //const [productAdded, setProductAdded] = useState([]);
  const productAdded = useSelector((state) => state.categorySlice.productAdded);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.post(
          `${url}/get`,
          {},
          { headers: { token } }
        );
        dispatch(setProductAdded(response.data.cartData));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (token) {
      fetchCartData();
    }
  }, [token, url,dispatch]);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(`${url}/admin/getAllProduct`);
        dispatch(setFoodlist(response.data.data));
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    fetchFoodList();
  }, [dispatch, url]);

  const getQuantity = (id) => {
    const product = productAdded.find((product) => product.id === id);
    return product ? product.quantity : 0;
  };

  return (
    <div className="p-4 sm:p-8 md:p-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Top dishes near you
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {foodlist
          .filter((item) => category === "all" || item.category === category)
          .map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[300px] p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div>
                <img
                  className="rounded-lg w-full h-48 object-cover mb-4 relative"
                  src={item.image.secure_url}
                  alt={item.name}
                />
                <div className="flex gap-4 rounded-xl text-[25px]">
                  <img
                    onClick={() =>
                      dispatch(
                        addProduct({
                          id: item._id,
                          name: item.name,
                          price: item.price,
                          quantity: getQuantity(item._id),
                        })
                      )
                    }
                    src={assets.add_icon_green}
                    alt="Add"
                  />
                  {getQuantity(item._id)}
                  <img
                    onClick={() =>
                      dispatch(
                        decreaseProduct({
                          id: item._id,
                          name: item.name,
                          price: item.price,
                          quantity: getQuantity(item._id),
                        })
                      )
                    }
                    src={assets.remove_icon_red}
                    alt="Remove"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">{item.name}</p>
                <img
                  src={assets.rating_starts}
                  alt="Rating stars"
                  className="w-16"
                />
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-xl font-bold text-green-500">
                ${item.price}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FoodMenu;
