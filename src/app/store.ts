import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/productsSlice";

export const store = configureStore({
  reducer: { product },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
