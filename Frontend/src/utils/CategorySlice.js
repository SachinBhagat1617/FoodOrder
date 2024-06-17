import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: "all",
  productAdded: [
    {
      id: "",
      quantity: 0,
      name: "",
      price: 0,
    },
  ],
  token: "",
  showLogin: false,
  totProduct: 0,
  url: "http://localhost:4000/api/v1",
  foodlist: [],
  fetchdata:[],
};
const addCartData = async (id, token) => {
  //console.log(id);
  const response = await axios.post("http://localhost:4000/api/v1/add", { itemId:id }, {headers:{token}}); // {headers:{token}} header mai token dala/post kia
  //console.log(response)
}
const decreaseCartData = async(id, token)=> {
  const response = await axios.post("http://localhost:4000/api/v1/remove", { itemId:id }, {headers:{token}});
}

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      if (state.category === action.payload) {
        state.category = "all";
      } else state.category = action.payload;
    },
    addProduct:  (state, action) => {
      // payload mai id,name, price ek object mai  aayega
      let flag = 0;
      for (let index = 0; index < state.productAdded.length; index++) {
        if (state.productAdded[index].id == action.payload.id) {
          state.productAdded[index].quantity =
            state.productAdded[index].quantity + 1;
          state.productAdded[index].price =
            state.productAdded[index].price *
            state.productAdded[index].quantity;

          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        const obj = {
          id: action.payload.id,
          quantity: action.payload.quantity + 1,
          name: action.payload.name,
          price: action.payload.price,
        };
        state.productAdded.push(obj);
      }
      if (state.token) {
        addCartData(action.payload.id, state.token);
      }
    },
    decreaseProduct: (state, action) => {
      const existingProduct = state.productAdded.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.productAdded = state.productAdded.filter(
            (product) => product.id !== action.payload.id
          );
        }
      }
      if (state.token) {
        decreaseCartData(action.payload.id, state.token);
      }
    },
    setLogin: (state, action) => {
      state.showLogin = !state.showLogin;
    },
    removeProduct: (state, action) => {
      state.productAdded = state.productAdded.filter(
        (product) => product.id !== action.payload.id
      );
      
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFoodlist: (state, action) => {
      action.payload.map((item, index) => {
        state.foodlist.push(item);
      });
    },
  },
});

export const {
  setCategory,
  addProduct,
  decreaseProduct,
  setLogin,
  removeProduct,
  totalProductAdded,
  setToken,
  setFoodlist,
} = categorySlice.actions;
export default categorySlice.reducer;
