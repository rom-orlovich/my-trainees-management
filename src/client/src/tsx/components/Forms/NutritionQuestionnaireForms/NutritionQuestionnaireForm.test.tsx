import userEvent from "@testing-library/user-event";
import { renderUI, ScreenTest } from "../../../../tests/test.utilities";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { loadingSpinnerTest } from "../../../routes/components/PersistedLogin/PersistedLogin.test";
import NutritionQuestionnaireEditForm from "./NutritionQuestionnaireEditForm";

describe("NutritionQuestionnaireForm.test", () => {
  const user = userEvent.setup();
  let screen: ScreenTest;
  test("expect filters model form will open", async () => {
    screen = renderUI(
      [
        "/",
        `/${APP_ROUTE.PROFILE_ROUTE}/${
          APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE
        }/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_EDIT_ROUTE}?profileID=${3}`,
      ],
      undefined,
      // <NutritionQuestionnaireEditForm />,
      {
        preloadedState: {
          authSlice: {
            user: {
              user_id: 2,
              role: "trainer",
              username: "trainer123",
              verify_token: null,

              profile_id: 2,
              trainee_id: null,
              trainer_user_id: null,
            },
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY3MzU2MzU3NiwiZXhwIjoxNjczNTY0NDc2fQ.TTJ0q4SeCNgrT08ny9TWab6Ek4r1LYnchpkfAQ4QFPw",
          },
        },
      }
    );

    await loadingSpinnerTest(screen);

    //   expect(
    //     await screen.findByRole("heading", { name: /Nutrition Questionnaire/ })
    //   ).toBeInTheDocument();
    // });

    const linkIcons = await screen.findAllByTestId(/link-icon/);
    expect(linkIcons.length).toBe(4);

    // Click on meals add
    // console.log(linkIcons[0].querySelector("a")!);
    const t = linkIcons[0].querySelector("a");
    if (t) {
      console.log("el", t);
      await userEvent.click(t);
    }

    // screen.debug(linkIcons[0]);
    console.log(
      "model",
      screen.store.getState().modelControllerSlice.isModelOpen
    );
    // const form = await screen.findByRole("form");
    // expect(form).toBeInTheDocument();

    // const inputMeals = await screen.findByDisplayValue(/33/);

    // expect(inputMeals).toBeInTheDocument();
  });
});
