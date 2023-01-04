import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppStore, RootState, setupStore } from "../tsx/redux/store";
import { mainRoutes } from "../tsx/routes/mainRoutes";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderUI = (
  UI: JSX.Element,
  {
    preloadedState = {},
    store = setupStore(preloadedState),

    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = () => (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={mainRoutes} />
      </Provider>
    </React.StrictMode>
  );

  return {
    ...store,
    ...render(UI, { wrapper, ...renderOptions }),
  };
};
