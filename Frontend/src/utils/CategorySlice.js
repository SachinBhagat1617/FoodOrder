import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: "all",
  productAdded: [],
  token: "",
  showLogin: false,
  totProduct: 0,
  url: "https://food-order-red.vercel.app/api/v1",
  foodlist: [],
  fetchdata: [],
  TotalProductAdded: 0,
};

const addCartData = async (id, name, quantity, price, token) => {
  const data = {
    id,
    name,
    quantity,
    price,
  };
  await axios.post("https://food-order-red.vercel.app/api/v1/add", data, {
    headers: { token },
  });
};

const decreaseCartData = async (id, name, quantity, price, token) => {
  const data = {
    id,
    name,
    quantity,
    price,
  };
  await axios.post("https://food-order-red.vercel.app/api/v1/remove", data, {
    headers: { token },
  });
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category =
        state.category === action.payload ? "all" : action.payload;
    },
    addProduct: (state, action) => {
      const existingProduct = state.productAdded.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.price =
          existingProduct.price * existingProduct.quantity;
      } else {
        state.productAdded.push({
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          price: action.payload.price,
        });
      }
      state.TotalProductAdded += 1;
      if (state.token) {
        addCartData(
          action.payload.id,
          action.payload.name,
          1,
          action.payload.price,
          state.token
        );
      }
    },
    decreaseProduct: (state, action) => {
      const existingProduct = state.productAdded.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          state.TotalProductAdded -= 1;
        } else {
          state.productAdded = state.productAdded.filter(
            (product) => product.id !== action.payload.id
          );
          state.TotalProductAdded -= 1;
        }
      }
      if (state.token) {
        decreaseCartData(
          action.payload.id,
          action.payload.name,
          1,
          action.payload.price,
          state.token
        );
      }
    },
    setLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
    removeProduct: (state, action) => {
      const product = state.productAdded.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        state.TotalProductAdded -= product.quantity;
        state.productAdded = state.productAdded.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFoodlist: (state, action) => {
      state.foodlist = action.payload;
    },
    setProductAdded: (state, action) => {
      state.productAdded = action.payload;
      state.TotalProductAdded = action.payload.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
    getTotalProductAdded: (state) => {
      state.TotalProductAdded = state.productAdded.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
  },
});

export const {
  setCategory,
  addProduct,
  decreaseProduct,
  setLogin,
  removeProduct,
  setToken,
  setFoodlist,
  setProductAdded,
  getTotalProductAdded,
} = categorySlice.actions;

export default categorySlice.reducer;
