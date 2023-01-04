import { render, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import HomePage from "../tsx/pages/HomePage/HomePage";
import { store } from "../tsx/redux/store";
import { mainRoutes } from "../tsx/routes/mainRoutes";
import { renderUI } from "./utilities";

describe("", () => {
  test("", async () => {
    renderUI(<HomePage />);
    const button = await screen.findByRole("link", { name: /Get Started/i });
  });
});
