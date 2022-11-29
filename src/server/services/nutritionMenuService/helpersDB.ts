import { insertMany, insertQueryOneItem } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/tableDataSQL";
import { createMenuDescription } from "./helpersCreateNutritionMenu";
import {
  MealFood,
  MealNutrientsCals,
  MealNutrientsFoodsObj,
  NutritionMenu,
  NutritionMenusMeals,
  NutritionQuestionnaire,
} from "./nutritionMenuServiceTypes";

export const insertNewNutritionMenuToDB = async (
  nutritionQuestionnaire: NutritionQuestionnaire
) => {
  const nutritionMenu: NutritionMenu = {
    date_start: new Date(),
    date_end: undefined,
    ...createMenuDescription(nutritionQuestionnaire),
  };

  const nutritionMenuInsertRes: NutritionMenu = await insertQueryOneItem(
    TABLES_DATA.NUTRITION_MENUS_LIST_TABLE_NAME,
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
  {
    mealTotalCals,
    mealProteinsTotalCals,
    mealCarbsTotalCals,
    mealFatsTotalCals,
  }: MealNutrientsCals,
  nutritionMenuId?: number,
  mealID?: number
) => {
  if (!nutritionMenuId || !mealID) return;
  const menuNutritionMealsObj: NutritionMenusMeals = {
    nutrition_menu_id: nutritionMenuId,
    calories_total: mealTotalCals,
    protein_cals: mealProteinsTotalCals,
    fat_cals: mealFatsTotalCals,
    carbs_cals: mealCarbsTotalCals,
    meal_id: mealID,
  };

  await insertQueryOneItem(
    TABLES_DATA.NUTRITION_MENUS_MEALS_TABLE_NAME,
    menuNutritionMealsObj
  );
};

export const WITH_CLAUSE_GET_NUTRITION_MENU = `WITH
all_meals_food AS (
    SELECT
        *
    from
        meals_foods as mf
        INNER JOIN foods as f on mf.food_id = f.food_id
),
pro AS (
    SELECT
        am.meal_id,
        am.food_name,
        am.food_amount
    from
        all_meals_food as am
    where
        nutrient_type = 'proteins'
    GROUP BY
        (am.meal_id, am.food_name, am.food_amount)
),
fats AS (
    SELECT
        am.meal_id,
        am.food_name,
        am.food_amount
    from
        all_meals_food as am
    where
        nutrient_type = 'fats'
    GROUP BY
        (am.meal_id, am.food_name, am.food_amount)
),
carbs AS (
    SELECT
        am.meal_id,
        am.food_name,
        am.food_amount
    from
        all_meals_food as am
    where
        nutrient_type = 'carbohydrates'
    GROUP BY
        (am.meal_id, am.food_name, am.food_amount)
),
calories_nutrients AS (
    select
        nmm.meal_id,
        nmm.calories_total,
        nmm.protein_cals,
        nmm.fat_cals,
        nmm.carbs_cals
    from
        nutrition_menus_meals nmm
        INNER JOIN meals m on nmm.meal_id = m.meal_id
),
meal AS (
    select
        mf.meal_id,
        json_build_object (
            'calories_total',
            (
                select
                    calories_total
                from
                    calories_nutrients
                where
                    mf.meal_id = calories_nutrients.meal_id
            ),
            'protein_cals',
            (
                select
                    protein_cals
                from
                    calories_nutrients
                where
                    mf.meal_id = calories_nutrients.meal_id
            ),
            'fat_cals',
            (
                select
                    fat_cals
                from
                    calories_nutrients
                where
                    mf.meal_id = calories_nutrients.meal_id
            ),
            'carbs_cals',
            (
                select
                    carbs_cals
                from
                    calories_nutrients
                where
                    mf.meal_id = calories_nutrients.meal_id
            ),
            'proteins',
            (
                select
                    json_agg (pro)
                from
                    pro
                where
                    mf.meal_id = pro.meal_id
            ),
            'fats',
            (
                select
                    json_agg (fats)
                from
                    fats
                where
                    mf.meal_id = fats.meal_id
            ),
            'carbs',
            (
                select
                    json_agg (carbs)
                from
                    carbs
                where
                    mf.meal_id = carbs.meal_id
            )
        ) as meal_details
    from
        meals_foods mf
    GROUP BY
        (mf.meal_id)
),
nutrition_menu AS (
    select
        nmm.nutrition_menu_id,
        json_build_object (
            'meals',
            (
                select
                    json_agg (meal)
                from
                    meal
            )
        ) as menu
    from
        nutrition_menus_meals nmm
        INNER JOIN meal m on m.meal_id = m.meal_id
    GROUP BY
        (nmm.nutrition_menu_id)
)`;
