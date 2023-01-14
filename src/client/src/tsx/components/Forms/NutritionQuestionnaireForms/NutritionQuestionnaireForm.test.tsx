import userEvent from "@testing-library/user-event";

import { renderUI, ScreenTest } from "../../../../tests/test.utilities";
import { User } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { loadingSpinnerTest } from "../../../routes/components/PersistedLogin/PersistedLogin.test";

export const LOGIN_USER = {
  user: {
    user_id: 2,
    role: "trainer",
    username: "trainer123",
    verify_token: null,
    profile_id: 2,
    trainee_id: null,
    trainer_user_id: null,
  } as User,
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY3MzU2MzU3NiwiZXhwIjoxNjczNTY0NDc2fQ.TTJ0q4SeCNgrT08ny9TWab6Ek4r1LYnchpkfAQ4QFPw",
};
const NUTRITION_QUESTIONNAIRE_ROUTES_ARR = [
  "/",
  `/${APP_ROUTE.PROFILE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE}/${
    APP_ROUTE.NUTRITION_QUESTIONNAIRE_EDIT_ROUTE
  }?profileID=${3}`,
];

export const renderNutritionQuestionnaireForm = async () => {
  let buttonIcons: HTMLElement[];
  const screen = renderUI(NUTRITION_QUESTIONNAIRE_ROUTES_ARR, undefined, {
    preloadedState: {
      authSlice: LOGIN_USER,
    },
  });
  await loadingSpinnerTest(screen);

  buttonIcons = await screen.findAllByTestId(/input-icon/);
  expect(buttonIcons.length).toBe(4);
  return { screen, buttonIcons };
};

describe("NutritionQuestionnaireForm.test", () => {
  const user = userEvent.setup();
  let screen: ScreenTest;
  // beforeAll(() => {
  //   const div = document.createElement("div");
  //   div.setAttribute("id", "model");
  //   document.body.appendChild(div);
  // });

  describe("expect filters model form will open", () => {
    let buttonIcons: HTMLElement[];
    beforeEach(async () => {
      screen = renderUI(NUTRITION_QUESTIONNAIRE_ROUTES_ARR, undefined, {
        preloadedState: {
          authSlice: LOGIN_USER,
        },
      });
      await loadingSpinnerTest(screen);

      buttonIcons = await screen.findAllByTestId(/input-icon/);
      expect(buttonIcons.length).toBe(4);
    });
    test("tests meals size form", async () => {
      const buttonIcon = buttonIcons[0];
      await user.click(buttonIcon);
      const inputMeals = await screen.findByDisplayValue(/33/);
      expect(inputMeals).toBeInTheDocument();
    });

    test("tests allergens checkboxes from", async () => {
      const buttonIcon = buttonIcons[1];
      await user.click(buttonIcon);
      const allergens = await screen.findAllByRole("checkbox");
      expect(allergens.length).toBe(19);
    });
    test("tests favorite foods list form", async () => {
      const buttonIcon = buttonIcons[2];
      await user.click(buttonIcon);
      const input = await screen.findByPlaceholderText(/Search Food/);
      expect(input).toBeInTheDocument();
    });
    test("tests blacklist foods list form", async () => {
      const buttonIcon = buttonIcons[3];
      await user.click(buttonIcon);
      const input = await screen.findByPlaceholderText(/Search Food/);
      expect(input).toBeInTheDocument();
    });
  });
});
