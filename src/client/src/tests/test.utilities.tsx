import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { AppStore, PreloadedStateStore, setupStore } from "../tsx/redux/store";
import { appRoutes } from "../tsx/routes/appRoutes";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedStateStore;
  store?: AppStore;
}

export const renderUI = (
  initialEntries = ["/"],
  UI: ReactElement | undefined = undefined,

  {
    preloadedState,
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
        {UI || <RouterProvider router={testRoutes} />}
      </Provider>
    </React.StrictMode>
  );

  return {
    store,
    ...render(UI || <></>, { wrapper, ...renderOptions }),
  };
};
export type ScreenTest = ReturnType<typeof renderUI>;
