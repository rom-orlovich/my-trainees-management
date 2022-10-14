/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: Record<string, boolean> = {};
export const menusSlice = createSlice({
  name: "menusSlice",
  initialState,
  reducers: {
    setOneDropDownOn: (state, actions: PayloadAction<string>) => {
      for (const x in state) {
        if (x !== actions.payload) state[x] = false;
      }
      state[actions.payload] = !state[actions.payload];
      return state;
    },
  },
});
export const getMenuSliceState = (state: RootState) => state.menusSlice;
export const { setOneDropDownOn } = menusSlice.actions;
