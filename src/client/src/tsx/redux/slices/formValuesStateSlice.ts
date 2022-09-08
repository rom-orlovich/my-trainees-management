import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  defaultValues: Record<string, any>;
} = {
  defaultValues: {},
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
  },
});
export const { saveFormState } = formValuesState.actions;
