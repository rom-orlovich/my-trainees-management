import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { middlewareArr, reducersArr } from "./api/hooksAPI";
import { menusSlice } from "./slices/menusSlice";
import { formValuesState } from "./slices/formValuesStateSlice";
import { tablesPaginationState } from "./slices/trackTablePagesSlice";
import { apiSideEffectSlice } from "./slices/apiSideEffectSlice";

//Configure the reducers and the middlewares of redux.
export const store = configureStore({
  reducer: {
    tablesPaginationState: tablesPaginationState.reducer,
    menusSlice: menusSlice.reducer,
    formValuesState: formValuesState.reducer,
    apiSideEffect: apiSideEffectSlice.reducer,
    ...reducersArr,
  },

  middleware: (defaultMiddleware) =>
    [...defaultMiddleware(), ...middlewareArr] as any,
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
