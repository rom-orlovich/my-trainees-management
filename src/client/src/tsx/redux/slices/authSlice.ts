import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authApi } from "../api/authAPI";
import { User } from "../api/interfaceAPI";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
const initialState: {
  user: User | null;
  expireAt: number;
  // accessToken: string | null;
  // firstD: boolean;
} = {
  user: null,
  // accessToken: null,
  expireAt: 0,
};
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    changeIsTokenExpiredState(state) {
      // state.isTokenExpired = !state.isTokenExpired;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,

        (state, action) => {
          const payload = action.payload;
          state.user = payload.user;
          // state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          const payload = action.payload;
          state.user = payload.user;
          state.expireAt = action.payload.expireAt;
          // console.log(payload.user);
          // state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = null;
        // state.accessToken = null;
      }),
  // .addMatcher(
  //   (
  //     action: PayloadAction<Record<string, any> | undefined, string, any>
  //   ) => {
  //     return action?.payload?.originalStatus >= 403;
  //   },
  //   (state) => {
  //     state.isTokenExpired = true;
  //   }
  // ),
});

export const { changeIsTokenExpiredState } = authSlice.actions;
export const getAuthState = (state: RootState) => state.authSlice;
