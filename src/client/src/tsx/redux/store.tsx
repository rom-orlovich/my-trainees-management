import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { middlewareArr, reducersArr } from "./api/hooksAPI";
import { menusSlice } from "./slices/menusSlice";
import { formValuesState } from "./slices/formValuesStateSlice";
import { tablesPaginationState } from "./slices/trackTablePagesSlice";
import { apiSideEffectSlice } from "./slices/apiSideEffectSlice";
import { authSlice } from "./slices/authSlice";
import { authApi } from "./api/authAPI";
import { modelControllerSlice } from "./slices/modelControllerSlice";
import { nutritionQuestionnaireSlice } from "./slices/nutritionQuestionnaireSlice";

// Configure the reducers and the middleware of redux.
export const store = configureStore({
  reducer: {
    tablesPaginationState: tablesPaginationState.reducer,
    menusSlice: menusSlice.reducer,
    formValuesState: formValuesState.reducer,
    apiSideEffect: apiSideEffectSlice.reducer,
    authSlice: authSlice.reducer,
    modelControllerSlice: modelControllerSlice.reducer,
    nutritionQuestionnaireSlice: nutritionQuestionnaireSlice.reducer,
    authApi: authApi.reducer,

    ...reducersArr,
  },

  middleware: (defaultMiddleware) =>
    [...defaultMiddleware(), ...middlewareArr, authApi.middleware] as any,
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
