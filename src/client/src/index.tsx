import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./tsx/redux/store";
import "./style/utilities/base.scss";

import { browserRoutes } from "./tsx/routes/browserRoutes";

const container = document.getElementById("root")!;

export const wrapperApp = (
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRoutes} />
    </Provider>
  </React.StrictMode>
);
const root = createRoot(container);
root.render(wrapperApp);
