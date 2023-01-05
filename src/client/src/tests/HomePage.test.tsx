import userEvent from "@testing-library/user-event";

import { PersistedLogin } from "../tsx/routes/utilities/PersistedLogin";
import { renderUI } from "./utilities";

describe("test initialization of the app ", () => {
  const user = userEvent.setup();
  let screen: ReturnType<typeof renderUI>;
  beforeEach(() => {
    screen = renderUI(<PersistedLogin />);
  });
  test("loading home page when the user is not login", async () => {
    const getStartedBtn = await screen.findByRole("link", {
      name: /Get Started/,
    });
    expect(getStartedBtn).toBeInTheDocument();
  });

  test("load login page", async () => {
    const getStartedBtn = await screen.findByRole("link", {
      name: /Get Started/,
    });
    await user.click(getStartedBtn);
    const loginBtn = screen.getByRole("button", { name: /Login/ });
    expect(loginBtn).toBeInTheDocument();
  });

  test.only("try login flow", async () => {
    const getStartedBtn = await screen.findByRole("link", {
      name: /Get Started/i,
    });
    await user.click(getStartedBtn);
    const loginBtn = screen.getByRole("button", { name: /Login/i });
    expect(loginBtn).toBeInTheDocument();
    await user.click(loginBtn);

    const textError = await screen.findByText(/Welcome,/);

    expect(textError).toBeInTheDocument();
  });
});
