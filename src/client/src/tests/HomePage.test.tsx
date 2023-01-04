import { cleanup, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../tsx/pages/HomePage/HomePage";
import { PersistedLogin } from "../tsx/routes/utilities/PersistedLogin";
import { renderUI } from "./utilities";

describe("", () => {
  const user = userEvent.setup();
  test("loading home page when the user is not login", async () => {
    const { findByRole } = renderUI(<PersistedLogin />);
    const getStartedBtn = await findByRole("link", { name: /Get Started/ });
    expect(getStartedBtn).toBeInTheDocument();
  });

  test("load login page", async () => {
    const { findByRole, getByRole } = renderUI(<PersistedLogin />);

    const getStartedBtn = await findByRole("link", { name: /Get Started/ });
    await user.click(getStartedBtn);
    const loginBtn = getByRole("button", { name: /Login/ });
    expect(loginBtn).toBeInTheDocument();
  });

  test.only("try login", async () => {
    const { findByRole, getByRole } = renderUI(<PersistedLogin />);
    const getStartedBtn = await findByRole("link", { name: /Get Started/i });
    await user.click(getStartedBtn);
    const loginBtn = getByRole("button", { name: /Login/i });
    await user.click(loginBtn);

    const textError = await findByRole("paragraph", { name: /faild/ });

    expect(textError).toBeInTheDocument();
  });
});
