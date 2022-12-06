/* eslint-disable camelcase */
import { insertQueryOneItem } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { NutritionQuestionnaireInsert } from "../controllers/helpersCreateNutritionQuestionnaire";
import { NutritionQuestionnaire } from "../nutritionMenuServiceTypes";

const calUserNumMeals = (dayStart: string, dayEnd: string) => {
  const [hoursStart, minStart] = dayStart.split(":").map(Number);
  const [hoursEnd, minEnd] = dayEnd.split(":").map(Number);
  const calDiffHoursBetween = Math.floor(
    (hoursEnd * 60 + minEnd - (hoursStart * 60 + minStart)) / 60
  );
  const numMeals = calDiffHoursBetween / 4;
  return numMeals;
};

const createRandomMealsSizePercents = (numMeals: number) => {
  let sumMealsPercents = 0;
  if (numMeals < 2)
    return { mealsSizePercentsArr: [100], sumMealsPercents: 100 };

  const mealsSizePercentsArr = [];
  for (let i = 0; i <= numMeals; i++) {
    const randomMealSize = Math.floor(20 + Math.random() * 29);
    sumMealsPercents += randomMealSize;
    mealsSizePercentsArr.push(randomMealSize);
  }

  return { sumMealsPercents, mealsSizePercentsArr };
};

const divideTheDiffFromEachMeals = (
  diff: number,
  mealsSizePercentsArr: number[]
) => {
  const numMeals = mealsSizePercentsArr.length;
  let newTotalMealsPercents = 0;
  // The relative amount that will subtract from each meal.
  const diffSubtract = Math.round(diff * (1 / numMeals));
  // Sum the newTotalMealsPercents and subtract from each meal the diffSubtract.s
  const newMealsSizePercentsArr = mealsSizePercentsArr.map((el) => {
    newTotalMealsPercents += el - diffSubtract;
    return el - diffSubtract;
  });

  return { newMealsSizePercentsArr, newTotalMealsPercents };
};

const balanceRandomMealsSizeToBeExact100 = (
  mealsSizePercentsArr: number[],
  sumMealsPercents: number
) => {
  const numMeals = mealsSizePercentsArr.length;
  const diff = sumMealsPercents - 100;
  // If sumMealsPercents is smaller than 100% just add the different.
  if (diff < 0) {
    mealsSizePercentsArr[numMeals - 1] += diff;
    return mealsSizePercentsArr;
  }

  const { newMealsSizePercentsArr, newTotalMealsPercents } =
    divideTheDiffFromEachMeals(diff, mealsSizePercentsArr);
  // Balance again if the newTotalMealsPercents is smaller than 100% so just increase the last meal in the diff.
  const newDiff = 100 - newTotalMealsPercents;
  if (newTotalMealsPercents < 100)
    newMealsSizePercentsArr[numMeals - 1] += newDiff;

  return newMealsSizePercentsArr;
};

const createMealsSizePercents = (
  nutritionQuestionnaireClient: NutritionQuestionnaire
) => {
  const { day_start, day_end, meals_calories_size_percents } =
    nutritionQuestionnaireClient;
  // Check if the user has already defined his meals size percents.
  if (meals_calories_size_percents.length) return meals_calories_size_percents;

  // Calculate the time the user is active during a day and define how many meals is needed.
  const numMeals = calUserNumMeals(day_start, day_end);

  // Calculate randoms meals size percent array
  let { sumMealsPercents, mealsSizePercentsArr } =
    createRandomMealsSizePercents(numMeals);

  // Return if there is only 1 meal.
  if (mealsSizePercentsArr.length === 1) return mealsSizePercentsArr;

  // Balance the percents of the meals to fill 100%.
  mealsSizePercentsArr = balanceRandomMealsSizeToBeExact100(
    mealsSizePercentsArr,
    sumMealsPercents
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
