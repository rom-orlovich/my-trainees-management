import { readFileSync } from "fs";
import {
  insertMany,
  insertQueryOneItem,
  selectQuery,
} from "../../../PGSql/simpleSqlQueries";
import { NUTRITION_MENU_WITH_QUERY_FILE_PATH } from "../../../utilities/serverConstants";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { createMenuDescription } from "./helpersCreateNutritionMenu";
import {
  MealFood,
  MealNutrientsCals,
  MealNutrientsFoodsObj,
  NutritionMenu,
  NutritionMenusMeals,
  NutritionQuestionnaire,
} from "../nutritionMenuServiceTypes";

export const getNutritionQuestionnaire = async (profileID: number) => {
  console.log(profileID);
  const nutritionQuestionnaireRes = await selectQuery(
    TABLES_DATA.NUTRITION_QUESTIONNAIRE_TABLE_NAME,
    "*",
    `WHERE ${TABLES_DATA.PROFILE_ID}=$1`,
    [profileID]
  );
  console.log(nutritionQuestionnaireRes);

  return nutritionQuestionnaireRes[nutritionQuestionnaireRes.length - 1];
};

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
// export const WITH_CLAUSE_GET_NUTRITION_MENU = readFileSync(
//   NUTRITION_MENU_WITH_QUERY_FILE_PATH,
//   "utf-8"
// );

export const WITH_CLAUSE_GET_NUTRITION_MENU = `with
meals_foods_w as (
    SELECT
        nmm.*,
        mf.food_id,
        mf.food_amount
    from
        nutrition_menus_meals as nmm
        INNER join meals_foods as mf on mf.meal_id = nmm.meal_id
    where
        nutrition_menu_id = $1
),
foods_w as (
    SELECT
        mfw.meal_id,
        nutrient_type,
        f.food_id,
        food_name,
        food_amount
    from
        meals_foods_w as mfw
        INNER join foods as f on f.food_id = mfw.food_id
),
meals_foods_join AS (
    SELECT
        mfw.meal_id,
        json_build_object (
            'calories_total',
            (mfw.calories_total),
            'protein_cals',
            (mfw.protein_cals),
            'fat_cals',
            (mfw.fat_cals),
            'carbs_cals',
            (mfw.carbs_cals),
            'proteins',
            (
                select
                    json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                from
                    foods_w as fw
                where
                    nutrient_type = 'proteins'
                    and mfw.meal_id = fw.meal_id
            ),
            'fats',
            (
                select
                    json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                from
                    foods_w as fw
                where
                    nutrient_type = 'fats'
                    and mfw.meal_id = fw.meal_id
            ),
            'carbohydrates',
            (
                select
                    json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                from
                    foods_w as fw
                where
                    nutrient_type = 'carbohydrates'
                    and mfw.meal_id = fw.meal_id
            )
        ) as meals_details
    FROM
        meals_foods_w as mfw
    GROUP BY
        (mfw.meal_id, mfw.calories_total, mfw.protein_cals, mfw.fat_cals, mfw.carbs_cals)
    order by
        mfw.meal_id asc
)
select
nmm.nutrition_menu_id,
json_agg (meals_details) as meals
from
meals_foods_join as mfj
INNER JOIN nutrition_menus_meals as nmm on nmm.meal_id = mfj.meal_id
GROUP BY
(nmm.nutrition_menu_id)`;
