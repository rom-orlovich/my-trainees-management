import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  defaultValues: Record<string, any>;
  formResponse: Record<string, any>;
} = {
  defaultValues: {},
  formResponse: {},
};
export const formValuesState = createSlice({
  name: "formState",
  initialState,
  reducers: {
    saveFormState: (
      state,
      action: PayloadAction<{ url: string; values: Record<string, any> }>
    ) => {
      state.defaultValues = {
        ...state.defaultValues,
        [action.payload.url]: action.payload.values,
      };
    },
    saveFormResponse: (
      state,
      action: PayloadAction<{ url: string; response: Record<string, any> }>
    ) => {
      state.formResponse = {
        ...state.formResponse,
        [action.payload.url]: action.payload.response,
      };
    },
  },
});
export const { saveFormState, saveFormResponse } = formValuesState.actions;
export const formsState = (state: RootState) => state.formValuesState;
