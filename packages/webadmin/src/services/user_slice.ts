import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/types";
import { signIn } from "./api/user";

export interface UserState {
  token: string;
  status: "idle" | "loading" | "failed";
  errorMessage?: string;
}

const initialState: UserState = {
  token: "",
  status: "idle",
};

export const signInAsync = createAsyncThunk("user/signIn", async (user: { username: string; password: string }) => {
  const response = await signIn(user.username, user.password);
  if (response.ok) {
    const auth = await response.json();
    if (auth.error_message) throw Error(auth.error_message);

    return auth.token;
  }

  const result = await response.json();
  const error = new Error(result.message || response.statusText);
  throw error;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = "loading";
        state.errorMessage = "";
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload;
        state.errorMessage = "";
      });
  },
});

export default userSlice.reducer;

export const { signOut } = userSlice.actions;

export const isLoadingSelector = (state: RootState) => state.user.status === "loading";
export const errorMessageSelector = (state: RootState) => state.user.errorMessage;
export const isLoggedInSelector = (state: RootState) => !!state.user.token;
