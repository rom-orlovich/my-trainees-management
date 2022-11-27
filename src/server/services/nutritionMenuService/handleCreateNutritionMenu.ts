/* eslint-disable camelcase */
/* eslint-disable import/first */
import { config } from "dotenv";

config();
import { RequestHandler } from "express";
import { shuffle } from "lodash";

import { client } from "../../PGSql/DBConnectConfig";
import { selectQuery } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";
import {
  filterArrObjBy,
  newDate,
  sortArrObjBy,
  sortBy,
} from "../../utilities/helpers";
import { GenericRecord } from "../../utilities/types";

import { Food } from "../foodsDataScraperService/types";
import { logger, loggerJson } from "../loggerService/logger";
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
  const proteinsFromFavoriteFood: Food[] = [];
  const fatsFromFavoriteFood: Food[] = [];
  const crabsFromFavoriteFood: Food[] = [];

  const getMostFoodScoreByAmount = (foods: Food[], amount: number = 100) =>
    sortArrObjBy(foods, "food_score", false).slice(amount);

  const proteinsFromFoodDbRes = getMostFoodScoreByAmount(
    filterArrObjBy(foods, "nutrient_type", "proteins"),
    100
  );
  const crabsFromFoodDbRes = getMostFoodScoreByAmount(
    filterArrObjBy(foods, "nutrient_type", "carbohydrates"),
    100
  );
  const fatsFromFoodDbRes = getMostFoodScoreByAmount(
    filterArrObjBy(foods, "nutrient_type", "fats"),
    100
  );

  const mapFavoriteFood = sortBy(favorite_foods).reduce((obj, foodID) => {
    obj[`${foodID}`] = foodID;
    return obj;
  }, {} as GenericRecord<number>);

  foods.forEach((food) => {
    const curFood = mapFavoriteFood[`${food.food_id}`];
    if (curFood) {
      if (food.nutrient_type === "proteins")
        proteinsFromFavoriteFood.push(food);
      if (food.nutrient_type === "fats") fatsFromFavoriteFood.push(food);
      if (food.nutrient_type === "carbohydrates")
        crabsFromFavoriteFood.push(food);
    }
  });

  const createChosenFoodArray = (
    favoriteFoods: Food[],
    foods: Food[],
    amount = 20
  ) => [...favoriteFoods, ...shuffle(foods).slice(amount)];

  const proteinsChosenFoods = createChosenFoodArray(
    proteinsFromFavoriteFood,
    proteinsFromFoodDbRes
  );
  const fatsChosenFoods = createChosenFoodArray(
    fatsFromFavoriteFood,
    fatsFromFoodDbRes
  );
  const crabsChosenFoods = createChosenFoodArray(
    crabsFromFavoriteFood,
    crabsFromFoodDbRes
  );
  const orderNutritionsFoods = [
    proteinsChosenFoods,
    fatsChosenFoods,
    crabsChosenFoods,
  ];

  const totalCals = lastMeasure.calories_total;
  const totalProteinCals = lastMeasure.protein_cals;
  const totalCrabsCals = lastMeasure.crabs_cals;
  const totalFatsCals = lastMeasure.fat_cals;

  const mealsNutrientsCalsDist = meals_dist_percents.map((percentsNum) => {
    const percents = percentsNum / 100;
    const mealProteinsTotalCals = totalProteinCals * percents;
    const mealFatsTotalCals = totalFatsCals * percents;
    const mealCrabsTotalCals = totalCrabsCals * percents;
    const mealTotalCals = totalCals * percents;
    return {
      mealProteinsTotalCals,
      mealFatsTotalCals,
      mealCrabsTotalCals,
      mealTotalCals,
    };
  });

  interface MealNutrientsCals {
    mealProteinsTotalCals: number;
    mealFatsTotalCals: number;
    mealCrabsTotalCals: number;
    mealTotalCals: number;
  }
  type NutrientCalsType = "protein_cals" | "crabs_cals" | "fat_cals";

  interface FoodMeal {
    meal_id?: number;
    food_id?: number;
    amount: number;
  }
  const checkHowManyTimeFoods = (
    food: Food,
    totalMealNutrientCals: number,

    key: NutrientCalsType
  ) => {
    let count = 0;

    let curCalNutrientCals = totalMealNutrientCals;
    while (curCalNutrientCals >= 0) {
      curCalNutrientCals -= food[key];
      count++;
    }

    return count;
  };

  const createFoodMeal = (
    food: Food,
    mealNutrientsCals: MealNutrientsCals,
    nutrientTypeCalsKey: NutrientCalsType,
    mealID?: number
  ) => {
    const amountFood = checkHowManyTimeFoods(
      food,
      mealNutrientsCals.mealProteinsTotalCals,

      nutrientTypeCalsKey
    );

    console.log({
      food_id: food?.food_id,
      amount: amountFood,
      meal_id: mealID,
      food_name: food.food_name,
      proteins_cals: food.protein_cals * amountFood,
      crabs_cals: food.crabs_cals * amountFood,
      fats_cals: food.fat_cals * amountFood,
      total_cals: food.calories_total * amountFood,
    });
    return {
      food_id: food?.food_id,
      amount: amountFood,
      meal_id: mealID,
      food_name: food.food_name,
      proteins_cals: food.protein_cals * amountFood,
      crabs_cals: food.crabs_cals * amountFood,
      fats_cals: food.fat_cals * amountFood,
      totalCals: food.fat_cals * amountFood,
    };
  };

  const createFoodMealByNutrient = (
    nutrientFoodsArr: Food[],
    mealNutrientsCals: MealNutrientsCals,
    nutrientTypeCalsKey: NutrientCalsType,
    mealID?: number
  ) =>
    nutrientFoodsArr.slice(0, 5).reduce((pre: FoodMeal[], food: Food) => {
      const foodMeal = createFoodMeal(
        food,
        mealNutrientsCals,
        nutrientTypeCalsKey,
        mealID
      );

      pre.push(foodMeal);
      return pre;
    }, []);

  const meals = mealsNutrientsCalsDist.map((mealNutrientsCals) => {
    const newMeal: Meal = {
      note_text: "",
      note_topic: "",
      user_id,
      meal_id: 0,
    };
    const createFoodMealByNutrientWithMealID = (
      nutrientFoodsArr: Food[],
      nutrientTypeCalsKey: NutrientCalsType
    ) =>
      createFoodMealByNutrient(
        nutrientFoodsArr,
        mealNutrientsCals,
        nutrientTypeCalsKey,
        newMeal.meal_id
      );

    const mealFoodsNutrients = {
      proteinsFoods: createFoodMealByNutrientWithMealID(
        proteinsChosenFoods,
        "protein_cals"
      ),

      fatsFoods: createFoodMealByNutrientWithMealID(
        fatsChosenFoods,
        "fat_cals"
      ),
      crabsFoods: createFoodMealByNutrientWithMealID(
        crabsChosenFoods,
        "crabs_cals"
      ),
    };
    return { ...newMeal, ...mealFoodsNutrients };
  });

  // loggerJson.debug(`LINE 274: meals`, { __filename, objs: [meals] });
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
