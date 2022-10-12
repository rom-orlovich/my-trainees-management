import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./tsx/redux/store";
import "./style/utilities/base.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./tsx/routes/AppRoutes";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
