import {
  balanceRandomMealsSizeToBeExact100,
  calUserNumMeals,
  completeTheDiffInEachMeals,
  createMealsSizePercents,
  createRandomMealsSizePercents,
} from "../utilities/helpersCreateNutritionQuestionnaire";

describe("helpersCreateNutritionQuestionnaire.ts", () => {
  test("test createRandomMealsSizePercents", () => {
    const { mealsSizePercentsArr, sumMealsPercents } =
      createRandomMealsSizePercents(3);
    expect(mealsSizePercentsArr.length).toBe(3);
    expect(sumMealsPercents).toBeGreaterThan(40);
  });

  test("test newMealsSizePercentsArr", () => {
    let { newMealsSizePercentsArr, newTotalMealsPercents } =
      completeTheDiffInEachMeals(50, [12, 24, 14]);
    expect(newMealsSizePercentsArr).toEqual([28, 40, 30]);
    expect(newTotalMealsPercents).toBe(98);

    ({ newMealsSizePercentsArr, newTotalMealsPercents } =
      completeTheDiffInEachMeals(100, [100]));
    expect(newMealsSizePercentsArr).toEqual([100]);
    expect(newTotalMealsPercents).toBe(100);
  });

  test("test balanceRandomMealsSizeToBeExact100", () => {
    let newMealsSizePercentsArr = balanceRandomMealsSizeToBeExact100({
      sumMealsPercents: 50,
      mealsSizePercentsArr: [12, 24, 14],
    });
    expect(newMealsSizePercentsArr).toEqual([28, 40, 32]);

    newMealsSizePercentsArr = balanceRandomMealsSizeToBeExact100({
      sumMealsPercents: 107,
      mealsSizePercentsArr: [12, 24, 14, 57],
    });
    expect(newMealsSizePercentsArr).toEqual([11, 23, 13, 53]);

    expect(newMealsSizePercentsArr.reduce((pre, cur) => pre + cur, 0)).toBe(
      100
    );
  });

  describe(" test calUserNumMeals", () => {
    test("test calUserNumMeals when hours are 11:35am-22:10pm", () => {
      const numMeals = calUserNumMeals("11:35", "22:10");
      expect(numMeals).toBe(2);
    });
    test("test calUserNumMeals when hours are 6:00am-23:00pm", () => {
      const numMeals = calUserNumMeals("6:35", "23:00");
      expect(numMeals).toBe(4);
    });
  });

  describe("test createMealsSizePercents", () => {
    test("test createMealsSizePercents when the user's meals preference is empty and the hours are 11:35am-22:10pm", () => {
      const res = createMealsSizePercents({
        day_start: "11:35",
        day_end: "22:10",
        meals_calories_size_percents: [],
      });
      expect(res.length).toBe(2);
    });

    test("test createMealsSizePercents when the user's meals preference is empty and the hours are 11:35am-22:10pm", () => {
      const res = createMealsSizePercents({
        day_start: "5:35",
        day_end: "22:10",
        meals_calories_size_percents: [],
      });
      expect(res.length).toBe(4);
    });

    test("test createMealsSizePercents when the user's meals preference is one meal of 100% and the hours are 11:35am-22:10pm", () => {
      const res = createMealsSizePercents({
        day_start: "11:35",
        day_end: "22:10",
        meals_calories_size_percents: [100],
      });
      expect(res.length).toBe(1);
    });
  });
});
