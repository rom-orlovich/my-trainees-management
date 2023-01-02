import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import HomePage from "../tsx/pages/HomePage/HomePage";
import { store } from "../tsx/redux/store";
import { mainRoutes } from "../tsx/routes/mainRoutes";

const wrapperApp = (
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={mainRoutes} />
    </Provider>
  </React.StrictMode>
);
describe("", () => {
  render(<HomePage />, { wrapper: wrapperApp });
  screen.getByRole("button", { name: / Get Started/i });
});
