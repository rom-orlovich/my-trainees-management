import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  defaultValues: Record<string, any>;
  errors: Record<string, any>;
} = {
  defaultValues: {},
  errors: {},
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
    saveErrorForm: (
      state,
      action: PayloadAction<{ url: string; error: string }>
    ) => {
      state.errors = {
        ...state.defaultValues,
        [action.payload.url]: action.payload.error,
      };
    },
  },
});
export const { saveFormState, saveErrorForm } = formValuesState.actions;
export const getFormsState = (state: RootState) => state.formValuesState;
