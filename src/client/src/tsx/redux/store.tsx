import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { middlewareArr, reducersArr } from "./api/hooksAPI";
import { menusSlice } from "./slices/menusSlice";
import { formValuesState } from "./slices/formValuesStateSlice";
import { tablesPaginationState } from "./slices/trackTablePagesSlice";
import { apiSideEffectSlice } from "./slices/apiSideEffectSlice";
import { authSlice } from "./slices/authSlice";
import { authApi } from "./api/authAPI";
import { modelControllerSlice } from "./slices/modelControllerSlices/modelControllerSlice";
import { nutritionQuestionnaireFormSlice } from "./slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { filterFoodsFormSlice } from "./slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
// Configure the reducers and the middleware of redux.
const configureStoreOptions: ConfigureStoreOptions = {
  reducer: {
    tablesPaginationState: tablesPaginationState.reducer,
    menusSlice: menusSlice.reducer,
    formValuesState: formValuesState.reducer,
    apiSideEffect: apiSideEffectSlice.reducer,
    authSlice: authSlice.reducer,
    modelControllerSlice: modelControllerSlice.reducer,
    nutritionQuestionnaireFormSlice: nutritionQuestionnaireFormSlice.reducer,
    filterFoodsFormSlice: filterFoodsFormSlice.reducer,
    authApi: authApi.reducer,
    ...reducersArr,
  },

  middleware: (defaultMiddleware) =>
    [...defaultMiddleware(), ...middlewareArr, authApi.middleware] as any,
};
export const store = configureStore(configureStoreOptions);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ ...configureStoreOptions, preloadedState });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
