import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/models";

// Define a type for the slice state
interface ProductState {
  loading: boolean;
  error: boolean;
  favorites: Product[];
  productList: Product[];
}

// Define the initial state using that type
const initialState: ProductState = {
  loading: false,
  error: false,
  favorites: [],
  productList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = false;
    },
    getSuccessProduct(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.error = false;
      state.productList = action.payload;
    },
    addFavorites(state, action: PayloadAction<Product>) {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite(state, action: PayloadAction<Product[]>) {
      state.favorites = action.payload;
    },
    fetchFail(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccessProduct,
  addFavorites,
  removeFavorite,
  fetchFail,
} = productSlice.actions;

export default productSlice.reducer;
