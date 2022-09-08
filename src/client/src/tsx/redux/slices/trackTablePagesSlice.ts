import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: Record<string, number> = {};

// This slice is in order to memorize the current page of the table.
// It helps to refetch the table  by memorize page when it is needed like,
// after submit form of add trainee.
export const tablesPagintationState = createSlice({
  name: "trackTablePages",
  initialState,
  reducers: {
    setPageState: (
      state,
      action: PayloadAction<{ name: string; page: number }>
    ) => {
      state = { [action.payload.name.toLowerCase()]: action.payload.page };
      return state;
    },
  },
});

export const { setPageState } = tablesPagintationState.actions;
export default tablesPagintationState.reducer;
