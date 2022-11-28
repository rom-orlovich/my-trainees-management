/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable import/first */
import { config } from "dotenv";

config();
import { RequestHandler } from "express";

import { client } from "../../PGSql/DBConnectConfig";
import { insertMany, insertQueryOneItem } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";

import { newDate } from "../../utilities/helpers";

import { Food } from "../foodsDataScraperService/types";
import { loggerJson } from "../loggerService/logger";

import { NUM_FOODS_IN_MEAL } from "./constants";
import {
  createChosenFoodsNutrientsArr,
  createMealFoodByNutrientAndDisqualifyByMeatAndMilk,
  createMealsNutrientsCalsDistribution,
  createMoreMealFoodsNutrientsForEachDisqualifiedFood,
  getFoodsByNutritionQuestionnaireParams,
  getLastMeasureByProfileID,
} from "./helpersCreateNutritionMenu";
import {
  insertNewFoodsInMeal,
  insertNewNutrientMenuMeal,
  insertNewNutritionMenuToDB,
} from "./helpersDB";
import {
  ChosenFoodsNutrientsArrObj,
  CreateMealFoodByNutrientWithMealIDFun,
  Meal,
  MealNutrientsCals,
  MealNutrientsFoodsObj,
  NutrientCalsType,
  NutritionMenu,
  NutritionQuestionnaire,
} from "./types";
// Creates array of foods for each nutrient.
export const createMealFoodsNutrients = (
  mealNutrientsCals: MealNutrientsCals,
  chosenFoodsNutrientsArrObj: ChosenFoodsNutrientsArrObj,
  createMealFoodByNutrientWithMealID: CreateMealFoodByNutrientWithMealIDFun
) => {
  const mealFoodsNutrients: MealNutrientsFoodsObj = {
    ...mealNutrientsCals,
    proteinsFoods: createMealFoodByNutrientWithMealID(
      chosenFoodsNutrientsArrObj.proteinsChosenFoods,
      "protein_cals",
      mealNutrientsCals.mealProteinsTotalCals
    ),

    fatsFoods: createMealFoodByNutrientWithMealID(
      chosenFoodsNutrientsArrObj.fatsChosenFoods,
      "fat_cals",
      mealNutrientsCals.mealFatsTotalCals
    ),
    carbsFoods: createMealFoodByNutrientWithMealID(
      chosenFoodsNutrientsArrObj.carbsChosenFoods,
      "carbs_cals",
      mealNutrientsCals.mealCarbsTotalCals
    ),
  };
  return mealFoodsNutrients;
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
  try {
    await client.connect();

    await client.query("BEGIN");

    // // Insert new nutritionMenu to db.
    const nutritionMenuInsertRes: NutritionMenu =
      await insertNewNutritionMenuToDB(nutritionQuestionnaire);

    // Gets foods from the db filter by user's nutrition questionnaire.
    const foods = await getFoodsByNutritionQuestionnaireParams(
      nutritionQuestionnaire
    );

    const lastMeasure = await getLastMeasureByProfileID(profile_id);
    const { protein_cals, fat_cals, carbs_cals, calories_total } = lastMeasure;
    // Creates for each meals it's nutrients calories distribution by user's preference.
    // The function get percents array of the relative size of each meal.
    // For example [50,25,25].
    const mealsNutrientsCalsDistribution =
      await createMealsNutrientsCalsDistribution(
        lastMeasure,
        meals_dist_percents
      );

    // Creates the potential menu foods divided by nutrients.
    const chosenFoodsNutrientsArrObj = createChosenFoodsNutrientsArr(
      foods,
      favorite_foods
    );

    const { proteinsChosenFoods, fatsChosenFoods, carbsChosenFoods } =
      chosenFoodsNutrientsArrObj;

    // Iterates over each meal's data obj with the nutrients calories.
    const meals = mealsNutrientsCalsDistribution.map(
      async (mealNutrientsCals, i) => {
        const keepMeatAndMilkObj = {
          meatIllegal: false,
          dairyIllegal: false,
          proteinIllegalCount: 0,
          fatsIllegalCount: 0,
          carbsIllegalCount: 0,
        };

        const newMeal: Meal = {
          note_text: "",
          note_topic: "",
          user_id,
        };

        const mealInsertRes: Meal = await insertQueryOneItem(
          TABLES_DATA.MEALS_TABLE_NAME,
          newMeal
        );

        // Set the mealID and keepMeatAndMilkObj into the createMealFoodByNutrientAndDisqualifyByMeatAndMilk fun.
        const createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID = (
          nutrientFoodsArr: Food[],
          nutrientTypeCalsKey: NutrientCalsType,
          mealNutrientsCals: number
        ) =>
          createMealFoodByNutrientAndDisqualifyByMeatAndMilk(
            nutrientFoodsArr,
            mealNutrientsCals,
            nutrientTypeCalsKey,
            newMeal.meal_id,
            isKeepMeatMilk ? keepMeatAndMilkObj : undefined,
            NUM_FOODS_IN_MEAL * i,
            NUM_FOODS_IN_MEAL * (i + 1)
          );

        // Creates array of foods for each nutrient.
        // const mealFoodsNutrients: MealNutrientsFoodsObj = {
        //   ...mealNutrientsCals,
        //   proteinsFoods:
        //     createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID(
        //       proteinsChosenFoods,
        //       "protein_cals",
        //       mealNutrientsCals.mealProteinsTotalCals
        //     ),

        //   fatsFoods:
        //     createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID(
        //       fatsChosenFoods,
        //       "fat_cals",
        //       mealNutrientsCals.mealFatsTotalCals
        //     ),
        //   carbsFoods:
        //     createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID(
        //       carbsChosenFoods,
        //       "carbs_cals",
        //       mealNutrientsCals.mealCarbsTotalCals
        //     ),
        // };
        const mealFoodsNutrients = createMealFoodsNutrients(
          mealNutrientsCals,
          chosenFoodsNutrientsArrObj,
          createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID
        );

        // Creates array of foods for each nutrient that replace the foods that were disqualified .
        const { carbsFoods, fatsFoods, proteinsFoods } =
          createMoreMealFoodsNutrientsForEachDisqualifiedFood(
            mealNutrientsCals,
            keepMeatAndMilkObj,
            chosenFoodsNutrientsArrObj,
            i,
            createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID
          );

        mealFoodsNutrients.proteinsFoods.push(...proteinsFoods);
        mealFoodsNutrients.carbsFoods.push(...fatsFoods);
        mealFoodsNutrients.fatsFoods.push(...carbsFoods);

        // insert new nutrient foods
        await insertNewFoodsInMeal(mealFoodsNutrients);
        await insertNewNutrientMenuMeal(
          nutritionMenuInsertRes.nutrition_menu_id,
          mealInsertRes.meal_id
        );
        return { ...mealInsertRes, ...mealFoodsNutrients };
      }
    );

    await Promise.all(meals);

    loggerJson.debug(`LINE 274: meals`, {
      __filename,
      objs: [
        {
          ...nutritionMenuInsertRes,
          calories_total,
          protein_cals,
          fat_cals,
          carbs_cals,
          meals,
        },
      ],
    });
    console.log("The nutrition menu was created successfully!");
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
  }
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

export const handleCreateNutritionMenu: RequestHandler = (req, res, next) => {};
