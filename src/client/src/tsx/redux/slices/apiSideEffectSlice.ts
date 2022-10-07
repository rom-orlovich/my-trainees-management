import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchBaseQueryArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import { RootState } from "../store";
const initialState = {
  goPrePageBehaviorState: {
    // The response of delete item from the api will have id.
    // therefore the page will return to the pre page.
    // Enable this behavior only for specific components like forms.
    disableGoPrevPage: true,
    goPrevPage: false,
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
      state.goPrePageBehaviorState.disableGoPrevPage = false;
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
    resetGoPrevPageState: (state) => {
      state.goPrePageBehaviorState.disableGoPrevPage = true;
      state.goPrePageBehaviorState.goPrevPage = false;
    },
  },

  extraReducers: (builder) =>
    // Checks when there is success response from the server after submit form
    // of update/add/delete method.

    builder
      .addMatcher(
        (action: { meta: { baseQueryMeta: FetchBaseQueryMeta } }) => {
          if (action?.meta?.baseQueryMeta?.response?.status === 201) {
            console.log(action);
          }
          return action?.meta?.baseQueryMeta?.response?.status === 201;
        },

        (state, action) => {
          // // Enable fetch alerts.
          state.fetchAlerts = true;
          /// In order to open the model. The model will not open when there is action on alert.

          // If there is success response from the server after submit form,
          // set goPrevPage to true , in order to go back the previous page.
          if (
            !state.goPrePageBehaviorState.disableGoPrevPage &&
            action?.payload?.status === undefined
          ) {
            state.goPrePageBehaviorState.goPrevPage = true;
          }
        }
      )
      .addMatcher(
        (action: PayloadAction<Record<string, any> | undefined>) => {
          return action.payload?.status >= 400;
        },
        (state) => {
          // state.fetchAlerts = true;
          // state.isModelOpen = true;
        }
      ),
});
export const {
  resetGoPrevPageState,
  enableGoPrevPage,
  disableFetchAlerts,
  changeModelState,
  changeAlertsState,
} = apiSideEffectSlice.actions;

export const getApiSideEffect = (state: RootState) => state.apiSideEffect;
