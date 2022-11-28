/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable import/first */
import { config } from "dotenv";

config();
import { RequestHandler } from "express";

import { client } from "../../PGSql/DBConnectConfig";

import { newDate } from "../../utilities/helpers";

import { Food } from "../foodsDataScraperService/types";
import { loggerJson } from "../loggerService/logger";

import { DEVIATION_NUMBER_PERCENTS, NUM_FOODS_IN_MEAL } from "./constants";
import {
  createChosenFoodsNutrientsArr,
  createFoodMealByNutrientAndDisqualifyByMeatAndMilk,
  createMealsNutrientsCalsDistribution,
  createMoreMealFoodsNutrientsForEachDisqualifiedFood,
  getFoodsByNutritionQuestionnaireParams,
} from "./helpersCreateNutritionMenu";
import { Meal, NutrientCalsType, NutritionQuestionnaire } from "./types";

export const createMealsDescription = ({
  kosher,
  is_vegan,
  is_vegetarian,
  diet_type,
}: NutritionQuestionnaire) => {
  const kosherText = kosher ? "כשרה" : "";

  return { title: `` };
};

const createNutritionMenu = async (
  nutritionQuestionnaire: NutritionQuestionnaire
) => {
  const {
    isKeepMeatMilk,
    favorite_foods,
    meals_dist_percents,
    profile_id,
    user_id,
    // diet_type,
  } = nutritionQuestionnaire;
  await client.connect();

  // const nutritionMenu: NutritionMenu = {
  //   nutrition_menu_id: 1,
  //   date_start: new Date(),
  //   date_end: undefined,
  //   note_text: "",
  //   note_topic: "",
  //   profile_id,
  //   user_id,
  // };

  // Gets foods from the db filter by user's nutrition questionnaire.
  const foods = await getFoodsByNutritionQuestionnaireParams(
    nutritionQuestionnaire
  );

  // Creates for each meals it's nutrients calories distribution by user's preference.
  // The function get percents array of the relative size of each meal.
  // For example [50,25,25].
  const mealsNutrientsCalsDistribution =
    await createMealsNutrientsCalsDistribution(profile_id, meals_dist_percents);

  // Creates the potential menu foods divided by nutrients.
  const chosenFoodsNutrientsArrObj = createChosenFoodsNutrientsArr(
    foods,
    favorite_foods
  );

  const { proteinsChosenFoods, fatsChosenFoods, carbsChosenFoods } =
    chosenFoodsNutrientsArrObj;

  // Iterates over each meal's data obj with the nutrients calories.
  const meals = mealsNutrientsCalsDistribution.map((mealNutrientsCals, i) => {
    const keepMeatAndMilkObj = {
      meatIllegal: false,
      dairyIllegal: false,
      proteinIllegalCount: 0,
      fatsIllegalCount: 0,
      carbsIllegalCount: 0,
    };
    const newMeal: Meal = {
      note_text: ``,
      note_topic: "",
      user_id,
      meal_id: 0,
    };
    const createFoodMealByNutrientAndDisqualifyByMeatAndMilkWithMealID = (
      nutrientFoodsArr: Food[],
      nutrientTypeCalsKey: NutrientCalsType,
      mealNutrientsCals: number
    ) =>
      createFoodMealByNutrientAndDisqualifyByMeatAndMilk(
        nutrientFoodsArr,
        mealNutrientsCals,
        nutrientTypeCalsKey,
        newMeal.meal_id,
        isKeepMeatMilk ? keepMeatAndMilkObj : undefined,
        NUM_FOODS_IN_MEAL * i,
        NUM_FOODS_IN_MEAL * (i + 1)
      );

    // Creates array of foods for each nutrient.
    const mealFoodsNutrients = {
      ...mealNutrientsCals,
      proteinsFoods:
        createFoodMealByNutrientAndDisqualifyByMeatAndMilkWithMealID(
          proteinsChosenFoods,
          "protein_cals",
          mealNutrientsCals.mealProteinsTotalCals
        ),

      fatsFoods: createFoodMealByNutrientAndDisqualifyByMeatAndMilkWithMealID(
        fatsChosenFoods,
        "fat_cals",
        mealNutrientsCals.mealFatsTotalCals
      ),
      carbsFoods: createFoodMealByNutrientAndDisqualifyByMeatAndMilkWithMealID(
        carbsChosenFoods,
        "carbs_cals",
        mealNutrientsCals.mealCarbsTotalCals
      ),
    };

    // Creates array of foods for each nutrient that replace the foods that were disqualified .
    const { carbsFoods, fatsFoods, proteinsFoods } =
      createMoreMealFoodsNutrientsForEachDisqualifiedFood(
        mealFoodsNutrients,
        keepMeatAndMilkObj,
        chosenFoodsNutrientsArrObj,
        i,
        createFoodMealByNutrientAndDisqualifyByMeatAndMilkWithMealID
      );

    mealFoodsNutrients.proteinsFoods.push(...proteinsFoods);
    mealFoodsNutrients.carbsFoods.push(...fatsFoods);
    mealFoodsNutrients.fatsFoods.push(...carbsFoods);

    return { ...newMeal, ...mealFoodsNutrients };
  });

  loggerJson.debug(`LINE 274: meals`, { __filename, objs: [meals] });
  console.log("The nutrition menu was created successfully!");
};

const nutritionQuestionnaires: NutritionQuestionnaire = {
  user_id: 2,
  allergens: [],
  black_list_foods: [],
  favorite_foods: [344],
  kosher: true,
  isKeepMeatMilk: true,
  is_vegan: false,
  is_vegetarian: false,
  profile_id: 3,
  day_start: new Date(),
  day_end: newDate(new Date(), { hPlus: 15 }),
  meals_dist_percents: [30, 50, 20],
  diet_type: "neutral",
};

createNutritionMenu(nutritionQuestionnaires);

const handlePrefrenceNutrition = (defaultMealNum = 3) => {
  // const defaultMealNum =
  //   meals_dist_percents?.length ||
  //   Math.floor(
  //     Math.abs((day_end.getTime() - day_start.getTime()) / 1000 / 3600 / 4)
  //   );
  const remainPercent = 100;
  const avgPercent = 100 / defaultMealNum;
  const t = DEVIATION_NUMBER_PERCENTS + Math.random() * Math.floor(avgPercent);
};

export const handleCreateNutritionMenu: RequestHandler = (req, res, next) => {};
