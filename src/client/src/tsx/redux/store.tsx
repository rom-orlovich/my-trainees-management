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

// The redux reducers of the app
const reducers = combineReducers({
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
const configureStoreOptions: ConfigureStoreOptions<
  ReturnType<typeof reducers>
> = {
  reducer: reducers,
  middleware: (
    defaultMiddleware: CurriedGetDefaultMiddleware<ReturnType<typeof reducers>>
  ) => [...defaultMiddleware(), authApi.middleware, ...(middlewareArr as any)],
};

export const setupStore = () => configureStore(configureStoreOptions);

export const store = setupStore();
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
