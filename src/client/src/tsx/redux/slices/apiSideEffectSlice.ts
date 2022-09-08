import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getKeysArrObj } from "../../utlities/helpersFun";
const initialState: {
  goPrePageBehaviorState: { goPrevPage: boolean; disableGoPrevPage: boolean };
} = {
  goPrePageBehaviorState: {
    // The response of delete item from the api will have id.
    // therefore the page will return to the pre page.
    // Enable this behavior only for spesifc components like forms.
    disableGoPrevPage: true,
    goPrevPage: false,
  },
};
export const apiSideEffectSlice = createSlice({
  name: "apiSideEffect",
  initialState,
  reducers: {
    // Enable  behavior of go back to previous page.
    enableGoPrevPage: (state) => {
      state.goPrePageBehaviorState.disableGoPrevPage = false;
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
        if (payload.includes("id")) {
          return true;
        } else return false;
      },
      // If there is success response from the server after submit form,
      // set goPrevPage to true , in order to go back the previous page.
      (state) => {
        if (!state.goPrePageBehaviorState.disableGoPrevPage) {
          state.goPrePageBehaviorState.goPrevPage = true;
        }
      }
    ),
});
export const { resetGoPrevPageState, enableGoPrevPage } =
  apiSideEffectSlice.actions;
