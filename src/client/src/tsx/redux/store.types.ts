import { Action, PreloadedState, ThunkAction } from "@reduxjs/toolkit";
import { setupStore, store, storeReducers } from "./store";

export type RootState = ReturnType<typeof storeReducers>;
export type PreloadedStateStore = PreloadedState<RootState>;
export type AppStore = ReturnType<typeof setupStore>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
