/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

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

const setLoginUserDataReducer = (
  state: {
    user: User | null;
    accessToken: string | null;
  },
  action: {
    payload: any;
    type: string;
  }
) => {
  const { payload } = action;
  state.user = payload.user;
  state.accessToken = payload.accessToken;
};

const setLogoutReducer = (state: {
  user: User | null;
  accessToken: string | null;
}) => {
  state.user = null;
  state.accessToken = null;
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setLogout: setLogoutReducer,
    setLoginUserData: setLoginUserDataReducer,
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        setLoginUserDataReducer
      )
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        setLoginUserDataReducer
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, setLogoutReducer),
});

export const { setLoginUserData, setLogout } = authSlice.actions;
export const getAuthState = (state: RootState) => state.authSlice;
