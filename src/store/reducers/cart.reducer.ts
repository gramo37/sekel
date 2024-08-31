import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";
import { CART } from "../../constants";

interface TState {
  products: TProduct[];
}

const persistedProducts = JSON.parse(localStorage.getItem(CART) ?? "[]");

const initialState: TState = {
  products: persistedProducts,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = [...state.products, action.payload];
      localStorage.setItem(CART, JSON.stringify(state.products));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      state.products.splice(index, 1);
      localStorage.setItem(CART, JSON.stringify(state.products));
    },
  },
});

export const { addProduct, removeProduct } = slice.actions;
export default slice.reducer;
