import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumber: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      const { phoneNumber, accessToken } = action.payload;
      state.phoneNumber = phoneNumber;
      state.token = accessToken;
      localStorage.setItem(
        "readers-current-user",
        JSON.stringify(accessToken)
      );
    },
    logoutReducer: (state) => {
      state.phoneNumber = undefined;
      state.token = undefined;
      localStorage.removeItem("readers-current-user");
    },
  },
});

export default authSlice.reducer;
export const { logoutReducer, loginReducer } = authSlice.actions;
