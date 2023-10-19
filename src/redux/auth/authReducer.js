import { createSlice } from "@reduxjs/toolkit";
import {
  authSignInUser,
  authSignOutUser,
  authSignUpUser,
  authStateChangeUser,
} from "./authOperations";

const initialState = {
  user: { login: null, email: null, userId: null },
  isLoggedIn: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(authSignUpUser.pending, (state, _) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(authSignUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(authSignUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(authSignInUser.pending, (state, _) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(authSignInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(authSignInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(authStateChangeUser.pending, (state, _) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(authStateChangeUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(authStateChangeUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(authSignOutUser.pending, (state, _) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(authSignOutUser.fulfilled, (state, _) => {
        state.user = initialState;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(authSignOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoading = false;
      }),
});
