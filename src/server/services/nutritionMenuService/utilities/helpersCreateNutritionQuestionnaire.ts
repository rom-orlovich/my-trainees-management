/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import { insertQueryOneItem } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { HOURS_BETWEEN_MEALS } from "../constants";

import { NutritionQuestionnaireInsert } from "../controllers/helpersCreateNutritionQuestionnaire";
import { NutritionQuestionnaire } from "../nutritionMenuServiceTypes";

export const calUserNumMeals = (
  dayStart: string,
  dayEnd: string,
  hourBetweenMeals = HOURS_BETWEEN_MEALS
) => {
  let [hoursStart, minStart] = dayStart.split(":").map(Number);
  const [hoursEnd, minEnd] = dayEnd.split(":").map(Number);

  if (hoursStart > hoursEnd) {
    hoursStart += 12;
  }

  const calDiffHoursBetween = Math.abs(
    Math.floor((hoursEnd * 60 + minEnd - (hoursStart * 60 + minStart)) / 60)
  );

  const numMeals = Math.floor(calDiffHoursBetween / hourBetweenMeals);

  return numMeals;
};

export const createRandomMealsSizePercents = (numMeals: number) => {
  let sumMealsPercents = 0;
  if (numMeals < 2)
    return { mealsSizePercentsArr: [100], sumMealsPercents: 100 };

  const mealsSizePercentsArr = [];
  for (let i = 0; i < numMeals; i++) {
    const randomMealSize = Math.floor(20 + Math.random() * 29);

    sumMealsPercents += randomMealSize;
    mealsSizePercentsArr.push(randomMealSize);
  }

  return { sumMealsPercents, mealsSizePercentsArr };
};

export const completeTheDiffInEachMeals = (
  sumMealsPercents: number,
  mealsSizePercentsArr: number[]
) => {
  let newMealsSizePercentsArr = mealsSizePercentsArr.slice();
  const diff = sumMealsPercents - 100;
  const numMeals = newMealsSizePercentsArr.length;
  let newTotalMealsPercents = 0;

  // Check if the diff is small than 5 and if it does just change the last meal.
  const diffAbs = Math.abs(diff);
  if (diffAbs < 5) {
    newTotalMealsPercents = sumMealsPercents;
    if (diff < 0) {
      newMealsSizePercentsArr[numMeals - 1] += diffAbs;
      newTotalMealsPercents += diffAbs;
    } else {
      newMealsSizePercentsArr[numMeals - 1] -= diffAbs;
      newTotalMealsPercents -= diffAbs;
    }
    return {
      newMealsSizePercentsArr,
      newTotalMealsPercents,
    };
  }

  // The relative amount that will subtract from each meal.
  const diffSubtract = Math.floor(Math.abs(diff * (1 / numMeals)));

  // Sum the newTotalMealsPercents and subtract from each meal the diffSubtract.s
  newMealsSizePercentsArr = newMealsSizePercentsArr.map((el) => {
    const mealDiff = diff < 0 ? el + diffSubtract : el - diffSubtract;
    newTotalMealsPercents += mealDiff;
    return mealDiff;
  });

  return { newMealsSizePercentsArr, newTotalMealsPercents };
};

export const balanceRandomMealsSizeToBeExact100 = (randomMealsSizePercentsObj: {
  sumMealsPercents: number;
  mealsSizePercentsArr: number[];
}) => {
  const { sumMealsPercents, mealsSizePercentsArr } = randomMealsSizePercentsObj;

  let newTotalMealsPercents;
  let newMealsSizePercentsArr;
  // If sumMealsPercents is smaller than 100% just add the relative different in each meal else subtract.
  ({ newMealsSizePercentsArr, newTotalMealsPercents } =
    completeTheDiffInEachMeals(sumMealsPercents, mealsSizePercentsArr));
  while (newTotalMealsPercents !== 100) {
    ({ newMealsSizePercentsArr, newTotalMealsPercents } =
      completeTheDiffInEachMeals(
        newTotalMealsPercents,
        newMealsSizePercentsArr
      ));
  }

  return newMealsSizePercentsArr;
};

export const createMealsSizePercents = <
  T extends {
    day_start: string;
    day_end: string;
    meals_calories_size_percents: number[];
  }
>(
  nutritionQuestionnaireClient: T,
  hourBetweenMeals = HOURS_BETWEEN_MEALS
) => {
  const { day_start, day_end, meals_calories_size_percents } =
    nutritionQuestionnaireClient;
  // Check if the user has already defined his meals size percents.
  if (meals_calories_size_percents.length) return meals_calories_size_percents;

  // Calculate the time the user is active during a day and define how many meals is needed.
  const numMeals = calUserNumMeals(day_start, day_end, hourBetweenMeals);

  // Calculate randoms meals size percent array
  const randomMealsSizePercentsObj = createRandomMealsSizePercents(numMeals);

  // Return if there is only 1 meal.
  if (randomMealsSizePercentsObj.mealsSizePercentsArr.length === 1)
    return randomMealsSizePercentsObj.mealsSizePercentsArr;

  // Balance the percents of the meals to fill 100%.
  const mealsSizePercentsArr = balanceRandomMealsSizeToBeExact100(
    randomMealsSizePercentsObj
  );

  return mealsSizePercentsArr;
};

const insertNewNutritionQuestionnaire = async (
  nutritionQuestionnaire: NutritionQuestionnaire,
  mealsSizePercentsArr: number[]
) => {
  // Stringify the data of black_list_foods and favorite_foods before insert them to the db.
  const nutritionQuestionnaireStringify: NutritionQuestionnaireInsert = {
    ...nutritionQuestionnaire,
    meals_calories_size_percents: mealsSizePercentsArr,
    black_list_foods: JSON.stringify(nutritionQuestionnaire.black_list_foods),
    favorite_foods: JSON.stringify(nutritionQuestionnaire.favorite_foods),
  };

  const insertNutritionQuestionnaireRes = await insertQueryOneItem(
    `${TABLES_DATA.NUTRITION_QUESTIONNAIRE_TABLE_NAME}`,
    nutritionQuestionnaireStringify,
    `ON CONFLICT (${TABLES_DATA.NUTRITION_QUESTIONNAIRE_ID}) DO UPDATE SET
    ${TABLES_DATA.NUTRITION_QUESTIONNAIRE_ID}=excluded.${TABLES_DATA.NUTRITION_QUESTIONNAIRE_ID},
      allergens= excluded.allergens,
      is_keep_meat_milk= excluded.is_keep_meat_milk,
  black_list_foods=excluded.black_list_foods,
  favorite_foods=excluded.favorite_foods,
  kosher=excluded.kosher,
  is_vegan=excluded.is_vegan,
  is_vegetarian=excluded.is_vegetarian,
  day_start=excluded.day_start,
  day_end=excluded.day_end,
  meals_calories_size_percents=excluded.meals_calories_size_percents,
  profile_id=excluded.profile_id,
  diet_type=excluded.diet_type,
  user_id=excluded.user_id`
  );

  return insertNutritionQuestionnaireRes;
};

export const createNutritionQuestionnaire = async (
  nutritionQuestionnaire: NutritionQuestionnaire
) => {
  const mealsSizePercentsArr = createMealsSizePercents(nutritionQuestionnaire);

  const insertNutritionQuestionnaireRes = await insertNewNutritionQuestionnaire(
    nutritionQuestionnaire,
    mealsSizePercentsArr
  );
  return insertNutritionQuestionnaireRes;
};
