import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "../api/authAPI";
import { User } from "../api/interfaceAPI";

import { RootState } from "../store";
const initialState: {
  user: User | null;
  expireAt: number;
  activeRefreshToken: boolean;
} = {
  user: null,
  expireAt: 0,
  activeRefreshToken: true,
};
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    activeRefreshToken(state) {
      state.activeRefreshToken = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const payload = action.payload;
        state.user = payload.user;
        state.expireAt = action.payload.expireAt;
        state.activeRefreshToken = false;
      })
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          const payload = action.payload;
          state.user = payload.user;
          state.expireAt = action.payload.expireAt;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = null;
      }),
});
export const { activeRefreshToken } = authSlice.actions;
export const getAuthState = (state: RootState) => state.authSlice;
