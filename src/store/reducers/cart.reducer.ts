import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";

interface TState {
  products: TProduct[];
}

const initialState: TState = {
  products: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = [...state.products, action.payload];
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload);
      state.products.splice(index, 1);
    },
  },
});

export const { addProduct, removeProduct } = slice.actions;
export default slice.reducer;
