import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IUser, AuthState } from "./types/auth.types"
import { getStoredAuth } from "../../utils/storage"

const initialState: AuthState = getStoredAuth()

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setAuthData(state, action: PayloadAction<{ token: string | null; user: IUser | null }>) {

            state.token = action.payload.token;
            state.user = action.payload.user;

        },

        logout(state) {

            state.token = null;
            state.user = null;

        },
    },
})

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
