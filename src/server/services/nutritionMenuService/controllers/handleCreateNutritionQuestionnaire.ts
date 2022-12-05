/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import { config } from "dotenv";
config();
import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";
import { insertQueryOneItem } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";

import { DietTypes } from "../nutritionMenuServiceTypes";

export interface FoodProps {
  id?: string;
  food_id: number;
  food_name: string;
}
export interface NutritionQuestionnaire {
  nutrition_questionnaire_id?: number;
  day_start: string;
  day_end: string;
  allergens: string[];
  black_list_foods: FoodProps[];
  favorite_foods: FoodProps[];
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  isKeepMeatMilk?: boolean;
  diet_type: DietTypes;
  meals_calories_size_percents?: number[];
  profile_id: number;
  user_id: number;
}

const clientData: NutritionQuestionnaire = {
  user_id: 2,
  day_start: "08:00",
  day_end: "23:59",
  profile_id: 1,
  diet_type: "neutral",
  kosher: true,
  is_vegan: false,
  is_vegetarian: false,
  meals_calories_size_percents: [],
  favorite_foods: [
    {
      food_id: 2,
      food_name:
        "WHEY PROTEIN VANILLA FLAVOR - חלבון מי גבינה בטעם וניל, allin",
    },
  ],
  black_list_foods: [{ food_id: 1, food_name: "חלבון ביצה" }],
  allergens: ["אגוזי פקאן"],
};

const createMealsSizePercents = (data: NutritionQuestionnaire) => {
  if (data?.meals_calories_size_percents?.length)
    return data?.meals_calories_size_percents;

  const [hoursStart, minStart] = data.day_start.split(":").map(Number);

  const [hoursEnd, minEnd] = data.day_end.split(":").map(Number);

  const calDiffHoursBetween = Math.floor(
    (hoursEnd * 60 + minEnd - (hoursStart * 60 + minStart)) / 60
  );

  const numMeals = calDiffHoursBetween / 4;

  let mealArr = [];
  let sumMeal = 0;
  if (numMeals > 1) {
    let i = 0;
    while (i <= numMeals) {
      const randomMealSize = Math.floor(20 + Math.random() * 29);

      sumMeal += randomMealSize;
      mealArr.push(randomMealSize);
      i++;
    }
    const diff = sumMeal - 100;

    if (diff > 0) {
      let sum = 0;
      const diffSubtract = Math.round(diff * (1 / numMeals));
      mealArr = mealArr.map((el) => {
        sum += el - diffSubtract;
        return el - diffSubtract;
      });

      const newDiff = 100 - sum;
      if (sum < 100) mealArr[i - 1] += newDiff;
      else mealArr[i - 1] -= newDiff;
    } else mealArr[i - 1] += diff;
  } else mealArr.push(100);

  return mealArr;
};

const insertNewNutritionQuestionnaire = async (
  data: NutritionQuestionnaire
) => {
  await client.connect();
  const res = await insertQueryOneItem(
    TABLES_DATA.NUTRITION_QUESTIONNAIRE_TABLE_NAME,
    data
  );
  console.log(res);
};

const createNutritionQuestionnaire = async (data: NutritionQuestionnaire) => {
  try {
    const mealsSize = createMealsSizePercents(data);

    const insertNutritionQuestionnaire: NutritionQuestionnaire = {
      ...data,
      meals_calories_size_percents: mealsSize,
    };
    await insertNewNutritionQuestionnaire(insertNutritionQuestionnaire);
  } catch (error) {
    console.log(error);
  }
};
createNutritionQuestionnaire(clientData);
export const handleCreateNutritionQuestionnaire: RequestHandler = (
  req,
  res,
  next
) => {
  const nutritionQuestionnaireClient = req.body as NutritionQuestionnaire;

  res.send("ok");
};
