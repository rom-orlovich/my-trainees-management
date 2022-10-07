import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "../api/authAPI";
import { User } from "../api/interfaceAPI";

import { RootState } from "../store";
const initialState: {
  user: User | null;
  accessToken: string | null;
} = {
  user: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const payload = action.payload;
        state.user = payload.user;

        state.accessToken = payload.accessToken;
      })
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          const payload = action.payload;
          state.user = payload.user;
          state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = null;
        state.accessToken = null;
      }),
});

export const getAuthState = (state: RootState) => state.authSlice;
