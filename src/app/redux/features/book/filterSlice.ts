import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: "",
    featured: false,
    update: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFeatured: (state, action) => {
      state.featured = action.payload;
    },
    setUpdateData: (state) => {
      state.update = true;
    },
    removeUpdateData: (state) => {
      state.update = false;
    },
  },
});

export const { setSearch, setFeatured, setUpdateData, removeUpdateData } =
  filterSlice.actions;

export default filterSlice.reducer;
