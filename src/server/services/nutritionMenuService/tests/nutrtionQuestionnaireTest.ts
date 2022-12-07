import {
  expectObj,
  expectPrimitive,
  testPackage,
} from "../../../utilities/testsUtilities";
import { AnyFun } from "../../../utilities/types";
import {
  balanceRandomMealsSizeToBeExact100,
  completeTheDiffInEachMeals,
  createRandomMealsSizePercents,
} from "../utilities/helpersCreateNutritionQuestionnaire";

function testRandomMeals(numMeals: number) {
  const { mealsSizePercentsArr, sumMealsPercents } =
    createRandomMealsSizePercents(numMeals);
  if (mealsSizePercentsArr.length === numMeals)
    console.log(`num meals is expectd ${numMeals}`, mealsSizePercentsArr);
  else {
    console.log(`test has failed ${numMeals}`, mealsSizePercentsArr);
  }
  if (sumMealsPercents > 50)
    console.log("res bigger than 50", sumMealsPercents);
  else {
    console.log("res lower than 50", sumMealsPercents);
  }
}

function completeTheDiffInEachMealsTest() {
  const { newMealsSizePercentsArr, newTotalMealsPercents } =
    completeTheDiffInEachMeals(118, [25, 50, 43]);
  expectPrimitive("newTotalMealsPercents", newTotalMealsPercents, 100);
  expectObj(
    "completeTheDiffInEachMeals",
    newMealsSizePercentsArr,
    [19, 44, 37]
  );
}

testPackage("completeTheDiffInEachMeals", completeTheDiffInEachMealsTest);

function testBalance() {
  let res = balanceRandomMealsSizeToBeExact100({
    sumMealsPercents: 50,
    mealsSizePercentsArr: [12, 24, 14],
  });

  expectObj("balanceRandomMealsSizeToBeExact100", res, [28, 40, 32]);
  res = balanceRandomMealsSizeToBeExact100({
    sumMealsPercents: 107,
    mealsSizePercentsArr: [12, 24, 14, 57],
  });

  expectObj("balanceRandomMealsSizeToBeExact100", res, [11, 23, 13, 53]);
}

testPackage("balance", testBalance);
