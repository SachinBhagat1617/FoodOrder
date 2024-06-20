import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const foodlist = useSelector((state) => state.categorySlice.foodlist);
  const productAdded = useSelector((state) => state.categorySlice.productAdded);
  const url = useSelector((state) => state.categorySlice.url);
  const token = useSelector((state) => state.categorySlice.token);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    productAdded.forEach((item) => {
      const foodItem = foodlist.find((food) => food._id === item.id);
      if (foodItem) {
        sum += foodItem.price * item.quantity;
      }
    });
    setTotal(sum);
  }, [productAdded, foodlist]);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to cart if no token or no items in cart
    if (!token || productAdded.length === 0) {
      navigate("/cart");
    }
  }, [token, productAdded, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderData = {
      address: data,
      items: productAdded,
      amount: (total + 2) * 80 * 100, // Including delivery fee
    };

    try {
      const response = await axios.post(url + "/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Payment Details Form */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
          <form onSubmit={placeOrder}>
            {/* First Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                onChange={onChangeHandler}
                name="firstName"
                value={data.firstName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                required
              />
            </div>
            {/* Last Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                onChange={onChangeHandler}
                name="lastName"
                value={data.lastName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                required
              />
            </div>
            {/* Phone */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                onChange={onChangeHandler}
                name="phone"
                value={data.phone}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={onChangeHandler}
                name="email"
                value={data.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Address */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                onChange={onChangeHandler}
                name="address"
                value={data.address}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                rows="4"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>
            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="lg:w-1/2">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
            {/* Display each item in the order */}
            {productAdded.map((item, index) => {
              const foodItem = foodlist.find((food) => food._id === item.id);
              if (foodItem) {
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center justify-between py-2 border-b"
                  >
                    <img
                      className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg"
                      src={foodItem.image.secure_url}
                      alt={foodItem.name}
                    />
                    <div className="md:w-1/4 text-center md:text-left text-gray-700 mt-2 md:mt-0">
                      {foodItem.name}
                    </div>
                    <div className="md:w-1/4 text-center md:text-left text-gray-700 mt-2 md:mt-0">
                      ${foodItem.price.toFixed(2)} x {item.quantity}
                    </div>
                    <div className="md:w-1/4 text-center md:text-left text-gray-700 mt-2 md:mt-0">
                      ${(foodItem.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            {/* Order totals */}
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-700">Subtotal</div>
              <div className="text-gray-700">${total.toFixed(2)}</div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-700">Delivery Fee</div>
              <div className="text-gray-700">
                {total > 0 ? "$2.00" : "0.00"}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-700 font-bold">Total</div>
              <div className="text-gray-700 font-bold">
                ${total > 0 ? (total + 2).toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
