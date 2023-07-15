import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import rootApi from "../features/api/rootApi";
import filterSlice from "../features/book/filterSlice";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    filter: filterSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export default store;
