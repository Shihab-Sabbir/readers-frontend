import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: undefined,
    email: undefined,
    role: undefined,
    id: undefined,
    token: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            const { name, email, role, id } = action.payload.user;
            state.name = name;
            state.email = email;
            state.role = role;
            state.id = id;
            state.token = action.payload.accessToken;
            localStorage.setItem('learning-portal-auth', JSON.stringify(action.payload))
        },
        logoutReducer: (state) => {
            state.name = undefined;
            state.email = undefined;
            state.role = undefined;
            state.id = undefined;
            state.token = undefined;
            localStorage.removeItem('learning-portal-auth')
        },
    }
})

export default authSlice.reducer;
export const { logoutReducer, loginReducer } = authSlice.actions;
