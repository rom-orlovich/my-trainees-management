import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/interfaceAPI";
const initialState: { user: User | null; accessToken: string | null } = {
  user: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<typeof initialState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
