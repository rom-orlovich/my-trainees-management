import {
  balanceRandomMealsSizeToBeExact100,
  calUserNumMeals,
  completeTheDiffInEachMeals,
  createMealsSizePercents,
  createRandomMealsSizePercents,
} from "../utilities/helpersCreateNutritionQuestionnaire";

describe.skip("helpersCreateNutritionQuestionnaire", () => {
  it("test createRandomMealsSizePercents", () => {
    const { mealsSizePercentsArr, sumMealsPercents } =
      createRandomMealsSizePercents(3);
    expect(mealsSizePercentsArr.length).toBe(3);
    expect(sumMealsPercents).toBeGreaterThan(40);
  });

  it("test newMealsSizePercentsArr", () => {
    let { newMealsSizePercentsArr, newTotalMealsPercents } =
      completeTheDiffInEachMeals(50, [12, 24, 14]);
    expect(newMealsSizePercentsArr).toEqual([28, 40, 30]);
    expect(newTotalMealsPercents).toBe(98);

    ({ newMealsSizePercentsArr, newTotalMealsPercents } =
      completeTheDiffInEachMeals(100, [100]));
    expect(newMealsSizePercentsArr).toEqual([100]);
    expect(newTotalMealsPercents).toBe(100);
  });

  it("test balanceRandomMealsSizeToBeExact100", () => {
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

  it("test createMealsSizePercents", () => {
    const numMeals = calUserNumMeals("11:35", "22:10");
    expect(numMeals).toBe(2);
    let res = createMealsSizePercents({
      day_start: "11:35",
      day_end: "22:10",
      meals_calories_size_percents: [],
    });
    expect(res.length).toBe(2);
    res = createMealsSizePercents({
      day_start: "11:35",
      day_end: "22:10",
      meals_calories_size_percents: [100],
    });
    expect(res.length).toBe(1);
  });
});
