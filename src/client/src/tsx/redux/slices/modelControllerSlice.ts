/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type ModelDisplayContentOptions = "meeting";
export interface ModelControllerState {
  displayContent: ModelDisplayContentOptions;
  isModelOpen: boolean;
}

const initialState: ModelControllerState = {
  isModelOpen: false,
  displayContent: "meeting",
};
export const modelControllerSlice = createSlice({
  name: "modelControllerSlice",
  initialState,
  reducers: {
    // Toggle the state of the model.
    changeModelState: (
      state,
      action: { payload: ModelDisplayContentOptions }
    ) => {
      state.isModelOpen = !state.isModelOpen;
      state.displayContent = action.payload;
    },
    closeModel: (state) => {
      state.isModelOpen = false;
    },
  },
});
export const { changeModelState, closeModel } = modelControllerSlice.actions;

export const getModelControllerState = (state: RootState) =>
  state.modelControllerSlice;
