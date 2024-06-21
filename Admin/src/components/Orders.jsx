import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../../Frontend/src/Food Del Frontend Assets/assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response);
      } else {
        console.error("Error fetching orders:", response.data.error);
        // You can use a toast library like toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error with toast or other error handling approach
    }
  };

  // Function to handle status change for an order
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh orders after successful status update
      } else {
        console.error("Error updating status:", response.data.error);
        // Handle error with toast or other error handling approach
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error with toast or other error handling approach
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Order Page</h3>
      {orders.map((order) =>
        order.payment ? ( // Conditionally render only if payment is successful
          <div key={order._id} className="bg-white rounded shadow-md mb-4 p-4">
            <div className="flex items-center mb-4">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-8 h-8 mr-2"
              />
              <span className="text-lg font-semibold">
                Order ID: {order._id}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">
                  Items:{" "}
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} X {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm">
                  Name: {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm">Address: {order.address.address}</p>
                <p className="text-sm">Phone No: {order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm">
                  Status:{" "}
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="w-full py-2 px-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>
                <p className="text-sm">Number of Items: {order.items.length}</p>
                <p className="text-sm">Total Amount: ₹{order.amount / 100}</p>
              </div>
            </div>
          </div>
        ) : null // Do not render if payment is not successful
      )}
    </div>
  );
};

export default Orders;

