import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./tsx/redux/store";
import "./style/utilities/base.scss";

import { mainRoutes } from "./tsx/routes/mainRoutes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={mainRoutes} />
    </Provider>
  </React.StrictMode>
);
