import { findAllByText, findByRole, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { ScreenTest } from "../../../../../tests/test.utilities";
import List from "../../../baseComponents/List/List";
import { renderNutritionQuestionnaireForm } from "../NutritionQuestionnaireForm.test";

describe("test food list form", () => {
  mockIntersectionObserver();
  const user = userEvent.setup();
  let screen: ScreenTest;
  let buttonIcons: HTMLElement[];
  beforeAll(async () => {
    ({ buttonIcons, screen } = await renderNutritionQuestionnaireForm());
    await user.click(buttonIcons[2]);
  });
  test("test autocomplete input", async () => {
    const input = screen.getByPlaceholderText("Search Food");
    fireEvent.change(input, { target: { value: "ח" } });
    const inputValue = screen.getByDisplayValue("ח");

    expect(inputValue).toHaveValue("ח");

    fireEvent.click(input);
    const li = await screen.findAllByRole("list", {
      //   description(accessibleDescription, element) {
      //     console.log(element.closest('[class="AutocompleteInput"]'));
      //     if (element.closest('[class*="AutocompleteInput"]')) {
      //       return true;
      //     }
      //     return false;
      //   },
    });
    console.log(li);
    // console.log(li);
  });
});
