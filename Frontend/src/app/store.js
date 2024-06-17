import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../utils/CategorySlice";

export const store = configureStore({
  reducer: {
    categorySlice : CategorySlice,
  },
});