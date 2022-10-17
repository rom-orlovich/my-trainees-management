import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import { RootState } from "../store";

export interface PayloadSideEffect {
  message?: string;
  data: any;
  statusCode?: number | undefined;
}

const initialState = {
  goPrePageBehaviorState: {
    // The response of delete item from the api will have id.
    // therefore the page will return to the pre page.
    // Enable this behavior only for specific components like forms.
    // disableGoPrevPage: false,
    goPrevPage: true,
  },
  isAlertsOpen: false,
  fetchAlerts: false,
  isModelOpen: false,
};
export const apiSideEffectSlice = createSlice({
  name: "apiSideEffect",
  initialState,
  reducers: {
    // Enable behavior of go back to previous page.
    enableGoPrevPage: (state) => {
      state.goPrePageBehaviorState.goPrevPage = true;
    },
    disableGoPrevPage: (state) => {
      state.goPrePageBehaviorState.goPrevPage = false;
    },

    // Toggle the state of the model.
    changeModelState: (state) => {
      state.isModelOpen = !state.isModelOpen;
    },
    // Toggle the state of the alert.
    changeAlertsState: (state) => {
      state.isAlertsOpen = !state.isAlertsOpen;
    },
    // Enable fetch new alerts.
    disableFetchAlerts: (state) => {
      state.fetchAlerts = false;
    },
    // Reset the goPrePageState.
  },

  extraReducers: (builder) =>
    // Checks when there is success response from the server after submit form
    // of update/add/delete method.

    builder
      .addMatcher(
        (action: PayloadAction<PayloadSideEffect>) =>
          action.payload?.statusCode === 201 &&
          !action.payload?.message?.includes("Login"),

        (state, action) => {
          // If there is success response from the server after submit form,
          // set goPrevPage to true , in order to go back the previous page.
          if (action?.payload?.status !== undefined) {
            state.goPrePageBehaviorState.goPrevPage = false;
          }
        }
      )
      .addMatcher(
        (action: PayloadAction<Record<string, any> | undefined>) =>
          action.payload?.statusCode === 201 &&
          !action.payload?.message?.includes("token"),
        (state) => {
          // // Enable fetch alerts.
          state.fetchAlerts = true;
        }
      ),
});
export const {
  enableGoPrevPage,
  disableGoPrevPage,
  disableFetchAlerts,
  changeModelState,
  changeAlertsState,
} = apiSideEffectSlice.actions;

export const getApiSideEffect = (state: RootState) => state.apiSideEffect;
