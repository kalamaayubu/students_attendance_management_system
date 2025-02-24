import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit"


// Get authState from cookies if exists
const getStoredAuth = () => {
    if (typeof window !== 'undefined') {
        const storedAuth = Cookies.get('authState');
        return storedAuth ? JSON.parse(storedAuth) : null
    }
    return null;
}

// Get initialState from cookies
const initialState = getStoredAuth() || {
    isAuthenticated: false,
    user: null,
    role: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.role = action.payload.role

            // Save authState in cookies
            Cookies.set('authState', JSON.stringify(state), { expires: 3, secure:  process.env.NODE_ENV === "production"})
        },

        logout: (state) => {
            state.isAuthenticated = false,
            state.user = null,
            state.role = null

            // Remove authState from cookies
            Cookies.remove('authState')
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions
export const selectAuth = state => state.auth
export default authSlice.reducer;