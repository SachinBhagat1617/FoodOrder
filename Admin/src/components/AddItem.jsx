import React, { useEffect, useState } from "react";
import axios from "axios";
 import { toast } from "react-toastify";
const AddItem = ({url}) => {
  //const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price",Number( data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(
      `${url}/admin/addProduct`,
      formData
      );
      console.log(response)
    if(response.data.sucess) {
      setData({ name: "", description: "", category: "Salad", price: "" });
      setImage(null);
      toast.success("Item Added");
    } else {
      toast.error("Error");
    }
  };
  return (
    <div className="p-4 w-1/2">
      <form
        onSubmit={onSubmitHandler}
        className="border-2 border-slate-500 p-4 rounded-lg flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium">
            Upload your image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="border-2 border-slate-500 p-2 rounded-md resize-none"
            onChange={onChangeHandler}
            value={data.description}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex flex-col mb-4 md:mb-0">
            <label htmlFor="category" className="mb-2 font-medium">
              Product Category
            </label>
            <select
              name="category"
              id="category"
              className="border-2 border-slate-500 p-2 rounded-md "
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Deserts">Deserts</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Sandwich">Sandwich</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="border-2 border-slate-500 p-2 rounded-md"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
