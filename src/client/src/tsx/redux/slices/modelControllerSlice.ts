/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type ModelDisplayContentOptions =
  | "meeting"
  | "participantsGroupsListForm"
  | "participantForm"
  | "activityForm"
  | "locationForm"
  | "cityForm"
  | "productForm"
  | "exerciseForm"
  | "equipmentForm"
  | "muscleGroupForm"
  | "subscriptionPlansForm";
export interface ModelControllerState {
  displayContent: ModelDisplayContentOptions[];
  isModelOpen: boolean;
  curParam?: number;
  lastModel?: ModelDisplayContentOptions;
}

const initialState: ModelControllerState = {
  isModelOpen: false,
  displayContent: ["meeting"],
  curParam: undefined,
  lastModel: undefined,
};
export const modelControllerSlice = createSlice({
  name: "modelControllerSlice",
  initialState,
  reducers: {
    // Toggle the state of the model.
    openModel: (
      state,
      action: {
        payload: {
          displayContent: ModelDisplayContentOptions;
          curParam?: number;
        };
      }
    ) => {
      state.isModelOpen = true;
      state.displayContent.push(action.payload.displayContent);
      state.lastModel = action.payload.displayContent;
      state.curParam = action.payload.curParam;
    },
    closeModel: (state) => {
      state.isModelOpen = false;
      state.displayContent = [];
      // state.curParam = undefined;
      state.lastModel = undefined;
    },
    preModel: (state) => {
      state.displayContent.pop();
      // state.curParam = undefined;
      state.lastModel = state.displayContent[state.displayContent.length - 1];
    },
  },
});
export const { openModel, closeModel, preModel } = modelControllerSlice.actions;

export const getModelControllerState = (state: RootState) =>
  state.modelControllerSlice;