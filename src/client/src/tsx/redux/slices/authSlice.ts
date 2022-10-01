import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authAPI";
import { User } from "../api/interfaceAPI";
const initialState: { user: User | null; accessToken: string | null } = {
  user: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    // setLogin: (state, action: PayloadAction<typeof initialState>) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.user = action.payload.user;
    // },
    // setLogout: (state) => {
    //   state.accessToken = null;
    //   state.user = null;
    // },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,

        (state, action) => {
          const payload = action.payload;
          state.user = payload.user;
          state.accessToken = payload.accessToken;
        }
      )
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

export const {} = authSlice.actions;
// export const { setLogin, setLogout } = authSlice.actions;
