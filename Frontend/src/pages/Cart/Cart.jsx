import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assets } from "../../Food Del Frontend Assets/assets/assets";
import axios from "axios";
import {
  decreaseProduct,
  removeProduct,
  setProductAdded,
} from "../../utils/CategorySlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const foodlist = useSelector((state) => state.categorySlice.foodlist);
  const token = useSelector((state) => state.categorySlice.token);
  const url = useSelector((state) => state.categorySlice.url);
  let total = 0;
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
  }, [token, url, dispatch]);

  const getQuantity = (id) => {
    const product = productAdded.find((product) => product.id === id);
    return product ? product.quantity : 0;
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <ul className="hidden md:flex justify-start bg-gray-200 p-4 rounded-t-lg font-semibold text-gray-700">
          <li className="w-1/6 ">Items</li>
          <li className="w-1/6 ">Title</li>
          <li className="w-1/6 ">Price</li>
          <li className="w-1/6 ">Quantity</li>
          <li className="w-1/6 ">Total</li>
          <li className="w-1/6 ">Remove</li>
        </ul>
        {productAdded.map((item, index) => {
          const foodItem = foodlist.find((food) => food._id === item.id);
          if (foodItem) {
            total += foodItem.price * item.quantity;
            return (
              <div
                key={index}
                className="border-b last:border-b-0 py-4 md:py-0 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <ul className="flex flex-col md:flex-row justify-between p-4">
                  <li className="md:w-1/6 text-center md:text-left mb-4 md:mb-0">
                    <img
                      className="h-16 w-16 md:h-20 md:w-20 object-cover mx-auto md:mx-0 rounded-lg"
                      src={foodItem.image.secure_url}
                      alt={foodItem.name}
                    />
                  </li>
                  <li className="md:w-1/6 flex items-center justify-center md:justify-start text-gray-800">
                    {foodItem.name}
                  </li>
                  <li className="md:w-1/6 flex items-center justify-center md:justify-start text-gray-800">
                    ${foodItem.price.toFixed(2)}
                  </li>
                  <li className="md:w-1/6 flex items-center justify-center md:justify-start text-gray-800">
                    {item.quantity}
                  </li>
                  <li className="md:w-1/6 flex items-center justify-center md:justify-start text-gray-800">
                    ${(foodItem.price * item.quantity).toFixed(2)}
                  </li>
                  <li className="md:w-1/6 flex items-center justify-center md:justify-start">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseProduct({
                            id: foodItem._id,
                            name: foodItem.name,
                            price: foodItem.price,
                            quantity: getQuantity(foodItem._id),
                          })
                        )
                      }
                    >
                      <img
                        className="h-6 w-6 cursor-pointer"
                        src={assets.remove_icon_red}
                        alt="Remove"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            );
          }

          return null; // Return null if foodItem is undefined
        })}
      </div>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="mt-12 py-10 lg:mt-0 lg:w-1/2 lg:pl-4">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Cart Totals</h1>
            <div className="flex flex-col md:flex-row justify-between py-2 border-b">
              <div className="text-gray-700">Subtotal</div>
              <div className="text-gray-700">${total.toFixed(2)}</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between py-2 border-b">
              <div className="text-gray-700">Delivery Fee</div>
              <div className="text-gray-700">
                {total > 0 ? "$2.00" : "0.00"}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between py-2 border-b">
              <div className="text-gray-700 font-bold">Total</div>
              <div className="text-gray-700 font-bold">
                ${total > 0 ? (total + 2).toFixed(2) : "0.00"}
              </div>
            </div>
            <button
              onClick={() => navigate("/payment")}
              className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
