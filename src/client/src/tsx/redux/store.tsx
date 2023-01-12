import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  ConfigureStoreOptions,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { middlewareArr, reducersObj } from "./api/hooksAPI";
import { menusSlice } from "./slices/menusSlice";
import { formValuesState } from "./slices/formValuesStateSlice";
import { tablesPaginationState } from "./slices/trackTablePagesSlice";
import { apiSideEffectSlice } from "./slices/apiSideEffectSlice";
import { authSlice } from "./slices/authSlice";
import { authApi } from "./api/authAPI";
import { modelControllerSlice } from "./slices/modelControllerSlices/modelControllerSlice";
import { nutritionQuestionnaireFormSlice } from "./slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { filterFoodsFormSlice } from "./slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import { RootState } from "./store.types";

// The redux reducers of the app
export const storeReducers = combineReducers({
  tablesPaginationState: tablesPaginationState.reducer,
  menusSlice: menusSlice.reducer,
  formValuesState: formValuesState.reducer,
  apiSideEffect: apiSideEffectSlice.reducer,
  authSlice: authSlice.reducer,
  modelControllerSlice: modelControllerSlice.reducer,
  nutritionQuestionnaireFormSlice: nutritionQuestionnaireFormSlice.reducer,
  filterFoodsFormSlice: filterFoodsFormSlice.reducer,
  authApi: authApi.reducer,
  ...reducersObj,
});

// Configure the reducers and the middleware of redux.
export const configureStoreOptions: ConfigureStoreOptions<RootState> = {
  reducer: storeReducers,
  middleware: (defaultMiddleware: CurriedGetDefaultMiddleware<RootState>) => [
    ...defaultMiddleware(),
    authApi.middleware,
    ...(middlewareArr as any),
  ],
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ ...configureStoreOptions, preloadedState });

export const store = setupStore();

setupListeners(store.dispatch);
