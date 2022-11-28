import { insertMany, insertQueryOneItem } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";
import { createMenuDescription } from "./helpersCreateNutritionMenu";
import {
  MealFood,
  MealNutrientsFoodsObj,
  NutritionMenu,
  NutritionMenusMeals,
  NutritionQuestionnaire,
} from "./types";

export const insertNewNutritionMenuToDB = async (
  nutritionQuestionnaire: NutritionQuestionnaire
) => {
  const nutritionMenu: NutritionMenu = {
    date_start: new Date(),
    date_end: undefined,
    ...createMenuDescription(nutritionQuestionnaire),
  };

  const nutritionMenuInsertRes: NutritionMenu = await insertQueryOneItem(
    TABLES_DATA.NUTRITION_MENUS_TABLE_NAME,
    nutritionMenu
  );
  return nutritionMenuInsertRes;
};

export const insertNewFoodsInMeal = async (
  mealFoodsNutrients: MealNutrientsFoodsObj
) => {
  const insertOnlyRelevantData = async (mealFood: MealFood[]) => {
    await insertMany(
      TABLES_DATA.MEALS_FOODS_TABLE_NAME,
      mealFood.map((el) => ({
        meal_id: el.meal_id,
        food_amount: el.amount,
        food_id: el.food_id,
      }))
    );
  };
  await insertOnlyRelevantData(mealFoodsNutrients.proteinsFoods);
  await insertOnlyRelevantData(mealFoodsNutrients.fatsFoods);
  await insertOnlyRelevantData(mealFoodsNutrients.carbsFoods);
};

export const insertNewNutrientMenuMeal = async (
  nutritionMenuId?: number,
  mealID?: number
) => {
  if (!nutritionMenuId || !mealID) return;
  const menuNutritionMealsObj: NutritionMenusMeals = {
    nutrition_menu_id: nutritionMenuId,
    meal_id: mealID,
  };

  await insertQueryOneItem(
    TABLES_DATA.NUTRITION_MENUS_MEALS_TABLE_NAME,
    menuNutritionMealsObj
  );
};
