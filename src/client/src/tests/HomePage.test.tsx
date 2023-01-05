import { waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { APP_ROUTE } from "../tsx/routes/appRoutesConstants";

import { PersistedLogin } from "../tsx/routes/utilities/PersistedLogin";
import { renderUI } from "./utilities";

const loadingSpinnerTest = async (screen: ReturnType<typeof renderUI>) => {
  const loading = await screen.findByText("Loading...");
  expect(loading).toBeInTheDocument();
  waitForElementToBeRemoved(screen.queryByText("Loading..."));
};
describe("test initialization of the app ", () => {
  const user = userEvent.setup();
  let screen: ReturnType<typeof renderUI>;
  // beforeEach(() => {
  //   screen = renderUI(<PersistedLogin />);
  // });
  test("loading home page when the user is not login", async () => {
    screen = renderUI(<PersistedLogin />);
    const getStartedBtn = await screen.findByRole("link", {
      name: /Get Started/,
    });
    expect(getStartedBtn).toBeInTheDocument();
  });

  test("load login page", async () => {
    screen = renderUI(<PersistedLogin />, ["/", `/${APP_ROUTE.LOGIN_ROUTE}`]);
    await loadingSpinnerTest(screen);
    const loginBtn = await screen.findByRole("button", { name: /Login/ });
    expect(loginBtn).toBeInTheDocument();
  });

  test("try login flow", async () => {
    screen = renderUI(<PersistedLogin />, ["/", `/${APP_ROUTE.LOGIN_ROUTE}`]);
    await loadingSpinnerTest(screen);

    const loginBtn = await screen.findByRole("button", { name: /Login/ });
    await user.click(loginBtn);

    const welcomeText = await screen.findByText(/Welcome,/);

    expect(welcomeText).toBeInTheDocument();
    expect(screen.store.getState().authSlice.user?.username).toBe("trainer123");
  });
});
