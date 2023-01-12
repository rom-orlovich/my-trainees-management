import { LOGIN_USER_DUMMY } from "../../../../mocks/handlers";
import { renderUI, ScreenTest } from "../../../../tests/test.utilities";
import { setupStore } from "../../../redux/store";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { loadingSpinnerTest } from "../../../routes/components/PersistedLogin/PersistedLogin.test";

describe("NutritionQuestionnaireForm.test", () => {
  let screen: ScreenTest;
  test("", async () => {
    screen = renderUI(
      [
        "/",
        `/${APP_ROUTE.PROFILE_ROUTE}/${
          APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE
        }/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_EDIT_ROUTE}?profileID=${3}`,
      ],
      undefined,
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
    screen.debug();

    expect(
      await screen.findByRole("heading", { name: /Nutrition Questionnaire/ })
    ).toBeInTheDocument();
  });
});
