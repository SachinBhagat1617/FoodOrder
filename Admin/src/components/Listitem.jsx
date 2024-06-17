import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../Frontend/src/Food Del Frontend Assets/assets/assets";

const Listitem = ({url}) => {
  //const url = "http://localhost:4000/api/v1";
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/admin/getAllProduct`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error while Fetching Data");
      }
    } catch (error) {
      toast.error("Error while Fetching Data");
      console.error("Error fetching data:", error);
    }
  };

  const removeData = async (id) => {
    try {
      const response = await axios.delete(`${url}/admin/deleteProduct/${id}`);
      if (response.data.success) {
        toast.success("Item removed successfully");
        fetchData(); // Refresh the list after deletion
      } else {
        toast.error("Error while removing Data");
      }
    } catch (error) {
      toast.error("Error while removing Data");
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">List of Items</h2>
      {list.length > 0 ? (
        <ul className="space-y-4">
          {list.map((item) => (
            <li
              key={item._id}
              className="border p-4 rounded-md flex flex-col md:flex-row gap-4"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-24 h-24 object-cover rounded-md"
                  src={item.image.secure_url}
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Name</p>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Price</p>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Description</p>
                  <p>{item.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeData(item._id)} // Update to pass the function reference
                    className="flex items-center text-red-500 hover:text-red-700 transition duration-300 cursor-pointer"
                  >
                    <img
                      className="w-6 h-6"
                      src={assets.cross_icon}
                      alt="Remove"
                    />
                    <span className="ml-2">Remove</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default Listitem;
