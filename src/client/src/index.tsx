import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from "./tsx/redux/store";
import "./style/utilities/base.scss";

import AppRoutes from "./tsx/routes/AppRoutes";
import { mainRoutes } from "./tsx/routes2/mainRoutes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
        <AppRoutes />
      </BrowserRouter> */}
      <RouterProvider router={mainRoutes} />
    </Provider>
  </React.StrictMode>
);
