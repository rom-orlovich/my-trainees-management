import { setupServer } from "msw/node";

import { handlers } from "./mocks/handlers";
import "@testing-library/jest-dom";

export const server = setupServer(...handlers);
beforeAll(() => {
  const div = document.createElement("div");
  div.setAttribute("id", "model");
  document.body.appendChild(div);
});

beforeEach(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});
