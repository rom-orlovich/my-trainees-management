import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getKeysArrObj } from "../../utilities/helpersFun";
const initialState: {
  goPrePageBehaviorState: { goPrevPage: boolean; disableGoPrevPage: boolean };
  fetchAlerts: boolean;
} = {
  goPrePageBehaviorState: {
    // The response of delete item from the api will have id.
    // therefore the page will return to the pre page.
    // Enable this behavior only for specific components like forms.
    disableGoPrevPage: true,
    goPrevPage: false,
  },
  fetchAlerts: false,
};
export const apiSideEffectSlice = createSlice({
  name: "apiSideEffect",
  initialState,
  reducers: {
    // Enable  behavior of go back to previous page.
    enableGoPrevPage: (state) => {
      state.goPrePageBehaviorState.disableGoPrevPage = false;
    },

    // Enable  behavior of go back to previous page.
    disableFetchAlerts: (state) => {
      state.fetchAlerts = false;
    },
    // Reset the goPrePageState.
    resetGoPrevPageState: (state) => {
      state.goPrePageBehaviorState.disableGoPrevPage = true;
      state.goPrePageBehaviorState.goPrevPage = false;
    },
  },
  extraReducers: (builder) =>
    // Checks when there is success response from the server after submit form
    // of update/add/delete method.
    builder.addMatcher(
      (action: PayloadAction<Record<string, any> | undefined>) => {
        const payload = getKeysArrObj(action.payload || {});
        return payload.includes("id") || payload.includes("status");
      },

      (state) => {
        state.fetchAlerts = true;
        // If there is success response from the server after submit form,
        // set goPrevPage to true , in order to go back the previous page.
        if (!state.goPrePageBehaviorState.disableGoPrevPage) {
          state.goPrePageBehaviorState.goPrevPage = true;
        }
      }
    ),
});
export const { resetGoPrevPageState, enableGoPrevPage, disableFetchAlerts } =
  apiSideEffectSlice.actions;
