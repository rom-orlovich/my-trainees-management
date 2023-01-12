import { waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { APP_ROUTE } from "../../appRoutesConstants";

import { renderUI, ScreenTest } from "../../../../tests/test.utilities";

export const loadingSpinnerTest = async (screen: ScreenTest) => {
  const loading = await screen.findByText("Loading...");
  expect(loading).toBeInTheDocument();
  waitForElementToBeRemoved(screen.queryByText("Loading..."));
};
describe("test PersistedLogin.tsx ", () => {
  const user = userEvent.setup();
  let screen: ScreenTest;

  test("loading home page when the user is not login", async () => {
    screen = renderUI();
    const getStartedBtn = await screen.findByRole("link", {
      name: /Get Started/,
    });
    expect(getStartedBtn).toBeInTheDocument();
  });

  test("load login page", async () => {
    screen = renderUI(["/", `/${APP_ROUTE.LOGIN_ROUTE}`]);
    await loadingSpinnerTest(screen);
    const loginBtn = await screen.findByRole("button", { name: /Login/ });
    expect(loginBtn).toBeInTheDocument();
  });

  test("try login flow", async () => {
    screen = renderUI(["/", `/${APP_ROUTE.LOGIN_ROUTE}`]);
    await loadingSpinnerTest(screen);
    const loginBtn = await screen.findByRole("button", { name: /Login/ });
    await user.click(loginBtn);
    const welcomeText = await screen.findByText(/Welcome,/);
    expect(welcomeText).toBeInTheDocument();

    expect(screen.store.getState().authSlice.user?.username).toBe("trainer123");
  });
});
