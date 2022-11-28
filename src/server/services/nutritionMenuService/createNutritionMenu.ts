/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable import/first */
import { config } from "dotenv";

config();
import { client } from "../../PGSql/DBConnectConfig";
import { insertQueryOneItem } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";

import { Food } from "../foodsDataScraperService/types";
import { loggerJson } from "../loggerService/logger";
import { NUM_FOODS_IN_MEAL } from "./constants";
import { nutritionQuestionnaires } from "./handleCreateNutritionMenu";
import {
  createChosenFoodsNutrientsArr,
  createMealFoodByNutrientAndDisqualifyByMeatAndMilk,
  createMealFoodsNutrients,
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
  Meal,
  NutrientCalsType,
  NutritionMenu,
  NutritionQuestionnaire,
} from "./types";

export const createNutritionMenu = async (
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
            mealInsertRes.meal_id,
            isKeepMeatMilk ? keepMeatAndMilkObj : undefined,
            NUM_FOODS_IN_MEAL * i,
            NUM_FOODS_IN_MEAL * (i + 1)
          );

        // Creates array of foods for each nutrient.
        const mealFoodsNutrients = createMealFoodsNutrients(
          mealNutrientsCals,
          chosenFoodsNutrientsArrObj,
          createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID
        );

        // Creates array of foods for each nutrient that replace the foods that were disqualified .
        createMoreMealFoodsNutrientsForEachDisqualifiedFood(
          mealNutrientsCals,
          keepMeatAndMilkObj,
          chosenFoodsNutrientsArrObj,
          i,
          createMealFoodByNutrientAndDisqualifyByMeatAndMilkWithMealID,
          mealFoodsNutrients
        );

        // insert new nutrient foods
        await insertNewFoodsInMeal(mealFoodsNutrients);
        await insertNewNutrientMenuMeal(
          nutritionMenuInsertRes.nutrition_menu_id,
          mealInsertRes.meal_id
        );
        return { ...mealInsertRes, ...mealFoodsNutrients };
      }
    );

    const mealsResPromises = await Promise.all(meals);

    loggerJson.debug(`LINE 274: meals`, {
      __filename,
      objs: [
        {
          ...nutritionMenuInsertRes,
          calories_total,
          protein_cals,
          fat_cals,
          carbs_cals,
          meals: mealsResPromises,
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
createNutritionMenu(nutritionQuestionnaires);
