import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AppStore, RootState, setupStore } from "../tsx/redux/store";
import { appRoutes, browserRoutes } from "../tsx/routes/appRoutes";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderUI = (
  UI: JSX.Element,
  initialEntries = ["/"],
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const testRoutes = createMemoryRouter(appRoutes, {
    initialEntries,
  });

  const wrapper = () => (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={testRoutes} />
      </Provider>
    </React.StrictMode>
  );

  return {
    ...store,
    ...render(UI, { wrapper, ...renderOptions }),
  };
};
