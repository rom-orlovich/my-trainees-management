/* eslint-disable camelcase */
/* eslint-disable import/first */
import { config } from "dotenv";

config();
import { RequestHandler } from "express";

import { client } from "../../PGSql/DBConnectConfig";
import { selectQuery } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";
import { newDate } from "../../utilities/helpers";
import { GenericRecord } from "../../utilities/types";

import { Food } from "../foodsDataScraperService/types";
import { MeasuresCalResAPI } from "../statisticService/serviceStatisticsTypes";
import { Meal, NutritionMenu, NutritionQuestionnaires } from "./types";

const DEVIATION_NUMBER_PERCENTS = 5;
const example = {
  measure_id: 23,
  profile_id: 3,
  weight: 65,
  height: 165,
  fat_percents: null,
  activity_factor: 29,
  protein_per_kg: 1.8,
  fat_per_kg: 0.8,
  protein_g: 117,
  fat_g: 52,
  crabs_g: 237.25,
  protein_cals: 468,
  fat_cals: 468,
  crabs_cals: 949,
  fixed_cals: 0,
  calories_total: 1885,
};

const nutritionQuestionnaires = {
  user_id: 2,
  allergens: ["ביצים"],
  black_list_foods: [1, 7, 92, 702, 81, 23],
  favorite_foods: [1, 300, 3, 5, 17, 23, 502],
  kosher: false,
  profile_id: 3,
  day_start: new Date(),
  day_end: newDate(new Date(), { hPlus: 15 }),
  meals_dist_percents: [50, 25, 25],
};

const createNutritionMenu = async ({
  allergens,
  black_list_foods,
  day_end,
  day_start,
  favorite_foods,
  kosher,
  meals_dist_percents,
  profile_id,
  user_id,
}: NutritionQuestionnaires) => {
  await client.connect();

  const measures: MeasuresCalResAPI[] = await selectQuery(
    TABLES_DATA.MEASURES_TABLE_NAME,
    `protein_cals, fat_cals ,crabs_cals,fixed_cals,calories_total`,
    `where ${TABLES_DATA.PROFILE_ID}=$1 `,
    [profile_id]
  );

  const nutritionMenu: NutritionMenu = {
    nutrition_menu_id: 1,
    date_start: new Date(),
    date_end: undefined,
    note_text: "",
    note_topic: "",
    profile_id,
    user_id,
  };

  // where not food_id = any(Array[1,2,3]) and not allergens&&ARRAY['גלוטן','ביצים','סויה'] and kosher=true

  const lastMeasure = measures[measures.length - 1];

  const kosherArr = kosher ? [kosher] : [];
  const foods = (await selectQuery(
    TABLES_DATA.FOODS_TABLE_NAME,
    "*",
    `where not food_id = any($1) and not allergens&& $2  ${
      kosher ? `and kosher=$3` : ""
    }`,
    [black_list_foods, allergens, ...kosherArr]
  )) as Food[];
  const proteinFromFavoriteFood: Food[] = [];
  const fatsFromFavoriteFood: Food[] = [];
  const crabsFromFavoriteFood: Food[] = [];
  const proteinFromFoodDbRes = foods.filter(
    (el) => el.food_type === "proteins"
  );
  const crabsFromFoodDbRes = foods.filter(
    (el) => el.food_type === "carbohydrates"
  );
  const fatsFromFoodDbRes = foods.filter((el) => el.food_type === "fats");

  const mapFavoriteFood = favorite_foods
    .filter((a, b) => a - b)
    .reduce((pre, cur) => {
      pre[`${cur}`] = cur;
      return pre;
    }, {} as GenericRecord<number>);

  foods.forEach((el) => {
    const curFood = mapFavoriteFood[`${el.food_id}`];
    if (curFood) {
      if (el.food_type === "proteins") proteinFromFavoriteFood.push(el);
      if (el.food_type === "fats") fatsFromFavoriteFood.push(el);
      if (el.food_type === "carbohydrates") crabsFromFavoriteFood.push(el);
    }
  });

  const defaultMealNum =
    meals_dist_percents?.length ||
    Math.floor(
      Math.abs((day_end.getTime() - day_start.getTime()) / 1000 / 3600 / 4)
    );
  const totalCal = lastMeasure.calories_total;
  const totalProteinCal = lastMeasure.protein_cals;
  const totalCrabsCal = lastMeasure.crabs_cals;
  const totalFatsCal = lastMeasure.fat_cals;
  const remainPercent = 100;
  const avgPercent = 100 / defaultMealNum;

  for (let i = 0; i < defaultMealNum; i++) {
    const percent = meals_dist_percents
      ? meals_dist_percents[i]
      : DEVIATION_NUMBER_PERCENTS + Math.random() * Math.floor(avgPercent);
    const meal: Meal = {
      note_text: "",
      note_topic: "",
      user_id,
      meal_id: i,
    };
    const proteinCalAfterPercent = totalProteinCal * percent;
    const fatCalAfterPercent = totalFatsCal * percent;
    const crabsCalAfterPercent = totalCrabsCal * percent;
    // const proteinsFood = {};
  }
};

createNutritionMenu(nutritionQuestionnaires);

export const handleCreateNutritionMenu: RequestHandler = (req, res, next) => {};
