import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { assets } from "../Food Del Frontend Assets/assets/assets";

const MyOrder = () => {
  const token = useSelector((state) => state.categorySlice.token);
  const url = useSelector((state) => state.categorySlice.url);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/order/userorders`,
        {}, // Empty body because we're fetching all user orders
        { headers: { token } }
      );
      //console.log(response.data);
      if (response.data.success) setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <img
        className="w-16 h-16 mb-4"
        src={assets.parcel_icon}
        alt="Parcel Icon"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((order, orderIndex) => {
          if (order.payment === true) {
            return (
              <div
                key={order._id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Order #{orderIndex + 1}
                </h2>
                <p className="mb-2">
                  <span className="font-bold">Amount: </span>₹
                  {order.amount / 100}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Items: </span>
                  {order.items.length}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Status: </span>
                  {order.status}
                </p>
                <div className="mb-4">
                  <span className="font-bold">Details: </span>
                  {order.items.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {item.name} x {item.quantity}
                      {itemIndex !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <button
                  onClick={fetchOrders}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Track Order
                </button>
              </div>
            );
          } else {
            return null; // Do not render if payment is not true
          }
        })}
      </div>
    </div>
  );
};

export default MyOrder;
