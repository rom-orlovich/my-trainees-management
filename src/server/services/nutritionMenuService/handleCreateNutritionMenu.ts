/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
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

import { Food, NutritionType } from "../foodsDataScraperService/types";
import { loggerJson } from "../loggerService/logger";
import { MeasuresCalResAPI } from "../statisticService/serviceStatisticsTypes";
import {
  DEVIATION_NUMBER_PERCENTS,
  NUM_FOODS_FOR_EACH_NUTRIENTS,
  NUM_FOODS_IN_MEAL,
} from "./constants";
import {
  DietTypes,
  Meal,
  NutritionMenu,
  NutritionQuestionnaire,
} from "./types";

export const getLastMeasureByProfileID = async (profileID: number) => {
  const measures: MeasuresCalResAPI[] = await selectQuery(
    TABLES_DATA.MEASURES_TABLE_NAME,
    `protein_cals, fat_cals ,carbs_cals,fixed_cals,calories_total`,
    `where ${TABLES_DATA.PROFILE_ID}=$1 `,
    [profileID]
  );
  const lastMeasure = measures[measures.length - 1];

  return lastMeasure;
};

const matchFoodByDietType = (foods: Food[], dietType: DietTypes) => {
  if (dietType === "neutral") return foods;
  const checkDietType = dietType === "cutting";
  return sortArrObjBy(foods, "food_density", checkDietType);
};

export const getFoodsByNutritionQuestionnaireParams = async ({
  kosher,
  is_vegan,
  is_vegetarian,
  black_list_foods,
  allergens,
}: NutritionQuestionnaire) => {
  const kosherArr = kosher ? [kosher] : [];
  const isVegan = is_vegan ? [is_vegan] : [];
  const isVegetarian = is_vegetarian ? [is_vegetarian] : [];
  const checkKosherStr = kosher ? `and kosher=$3` : "";
  const checkIsVeganStr = is_vegan ? `and is_vegan=$4` : "";
  const checkIsVegetarianStr = is_vegetarian ? `and is_vegan=$5` : "";

  const foods = (await selectQuery(
    TABLES_DATA.FOODS_TABLE_NAME,
    "*",
    `where not food_id = any($1) and not allergens && $2 ${checkKosherStr}    
    ${checkIsVeganStr} ${checkIsVegetarianStr} `,
    [black_list_foods, allergens, ...kosherArr, ...isVegan, ...isVegetarian]
  )) as Food[];

  return foods;
};

export const getBestNutrientsFoods = (foods: Food[], amount = 100) => {
  const prepareMostFoodScoreByAmount = (foods: Food[], amount = 100) =>
    sortArrObjBy(foods, "food_score", false).slice(0, amount);

  const getMostFoodsScoreByAmount = (nutrientType: NutritionType) =>
    prepareMostFoodScoreByAmount(
      filterArrObjBy(foods, "nutrient_type", [nutrientType]),
      amount
    );
  const proteinsFromFoodDbRes = getMostFoodsScoreByAmount("proteins");
  const carbsFromFoodDbRes = getMostFoodsScoreByAmount("carbohydrates");
  const fatsFromFoodDbRes = getMostFoodsScoreByAmount("fats");

  return { proteinsFromFoodDbRes, carbsFromFoodDbRes, fatsFromFoodDbRes };
};

export const createFavoritesNutrientsArr = (
  favorite_foods: number[],
  foods: Food[]
) => {
  const proteinsFromFavoriteFood: Food[] = [];
  const fatsFromFavoriteFood: Food[] = [];
  const carbsFromFavoriteFood: Food[] = [];

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
        carbsFromFavoriteFood.push(food);
    }
  });

  return {
    proteinsFromFavoriteFood,
    fatsFromFavoriteFood,
    carbsFromFavoriteFood,
  };
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
    diet_type,
  } = nutritionQuestionnaire;
  await client.connect();
  const lastMeasure = await getLastMeasureByProfileID(profile_id);

  const nutritionMenu: NutritionMenu = {
    nutrition_menu_id: 1,
    date_start: new Date(),
    date_end: undefined,
    note_text: "",
    note_topic: "",
    profile_id,
    user_id,
  };

  const foods = await getFoodsByNutritionQuestionnaireParams(
    nutritionQuestionnaire
  );

  const { carbsFromFoodDbRes, fatsFromFoodDbRes, proteinsFromFoodDbRes } =
    getBestNutrientsFoods(foods, NUM_FOODS_FOR_EACH_NUTRIENTS);

  const {
    carbsFromFavoriteFood,
    fatsFromFavoriteFood,
    proteinsFromFavoriteFood,
  } = createFavoritesNutrientsArr(favorite_foods, foods);

  const createChosenFoodArray = (favoriteFoods: Food[], foods: Food[]) => [
    ...favoriteFoods,
    ...shuffle(foods),
  ];

  const proteinsChosenFoods = createChosenFoodArray(
    proteinsFromFavoriteFood,
    proteinsFromFoodDbRes
  );
  const fatsChosenFoods = createChosenFoodArray(
    fatsFromFavoriteFood,
    fatsFromFoodDbRes
  );
  const carbsChosenFoods = createChosenFoodArray(
    carbsFromFavoriteFood,
    carbsFromFoodDbRes
  );

  const totalCals = lastMeasure.calories_total;
  const totalProteinCals = lastMeasure.protein_cals;
  const totalCarbsCals = lastMeasure.carbs_cals;
  const totalFatsCals = lastMeasure.fat_cals;

  const mealsNutrientsCalsDist = meals_dist_percents.map((percentsNum) => {
    const percents = percentsNum / 100;
    const mealProteinsTotalCals = totalProteinCals * percents;
    const mealFatsTotalCals = totalFatsCals * percents;
    const mealCarbsTotalCals = totalCarbsCals * percents;
    const mealTotalCals = totalCals * percents;
    return {
      mealProteinsTotalCals,
      mealFatsTotalCals,
      mealCarbsTotalCals,
      mealTotalCals,
    };
  });

  interface MealNutrientsCals {
    mealProteinsTotalCals: number;
    mealFatsTotalCals: number;
    mealCarbsTotalCals: number;
    mealTotalCals: number;
  }
  type NutrientCalsType = "protein_cals" | "carbs_cals" | "fat_cals";

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
    let amount = 0;

    let curCalNutrientCals = totalMealNutrientCals;
    if (curCalNutrientCals < food[key]) {
      return Number((curCalNutrientCals / food[key]).toFixed(2));
    }
    while (curCalNutrientCals - food[key] >= 0) {
      curCalNutrientCals -= food[key];
      amount++;
    }

    return amount;
  };

  const createFoodMeal = (
    food: Food,
    mealNutrientsCals: number,
    nutrientTypeCalsKey: NutrientCalsType,
    mealID?: number
  ) => {
    const amountFood = checkHowManyTimeFoods(
      food,
      mealNutrientsCals,

      nutrientTypeCalsKey
    );

    return {
      food_id: food?.food_id,
      amount: amountFood,
      meal_id: mealID,
      food_name: food.food_name,
      proteins_cals: food.protein_cals * amountFood,
      carbs_cals: food.carbs_cals * amountFood,
      fats_cals: food.fat_cals * amountFood,
      totalCals: food.calories_total * amountFood,
      food_score: food.food_score,
      food_density: food.food_density,
    };
  };

  const createFoodMealByNutrient = (
    nutrientFoodsArr: Food[],
    mealNutrientsCals: number,
    nutrientTypeCalsKey: NutrientCalsType,
    mealID?: number,
    keepMeatMilkObj?: {
      meatIllegal: boolean;
      dairyIllegal: boolean;
      proteinIllegalCount: number;
      fatsIllegalCount: number;
      carbsIllegalCount: number;
    },
    start = 0,
    amount = NUM_FOODS_IN_MEAL
  ) =>
    nutrientFoodsArr
      .slice(start, amount)
      .reduce((pre: FoodMeal[], food: Food) => {
        // console.log(keepMeatMilkObj);
        if (keepMeatMilkObj)
          if (!keepMeatMilkObj.meatIllegal && food.kosher_type === "בשרי") {
            keepMeatMilkObj.dairyIllegal = true;
          } else if (!keepMeatMilkObj.dairyIllegal)
            keepMeatMilkObj.meatIllegal = true;

        if (keepMeatMilkObj) {
          if (
            (keepMeatMilkObj.meatIllegal && food.kosher_type === "חלבי") ||
            (keepMeatMilkObj.dairyIllegal && food.kosher_type === "בשרי")
          ) {
            if (food.nutrient_type === "proteins")
              keepMeatMilkObj.proteinIllegalCount++;
            if (food.nutrient_type === "fats")
              keepMeatMilkObj.fatsIllegalCount++;
            if (food.nutrient_type === "carbohydrates")
              keepMeatMilkObj.carbsIllegalCount++;

            return pre;
          }
        }

        const foodMeal = createFoodMeal(
          food,
          mealNutrientsCals,
          nutrientTypeCalsKey,
          mealID
        );

        pre.push(foodMeal);
        return pre;
      }, []);

  const meals = mealsNutrientsCalsDist.map((mealNutrientsCals, i) => {
    const keepMeatMilkObj = {
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
      meal_id: 0,
    };
    const createFoodMealByNutrientWithMealID = (
      nutrientFoodsArr: Food[],
      nutrientTypeCalsKey: NutrientCalsType,
      mealNutrientsCals: number
    ) =>
      createFoodMealByNutrient(
        nutrientFoodsArr,
        mealNutrientsCals,
        nutrientTypeCalsKey,
        newMeal.meal_id,
        isKeepMeatMilk ? keepMeatMilkObj : undefined,
        NUM_FOODS_IN_MEAL * i,
        NUM_FOODS_IN_MEAL * (i + 1)
      );

    const mealFoodsNutrients = {
      ...mealNutrientsCals,
      proteinsFoods: createFoodMealByNutrientWithMealID(
        proteinsChosenFoods,
        "protein_cals",
        mealNutrientsCals.mealProteinsTotalCals
      ),

      fatsFoods: createFoodMealByNutrientWithMealID(
        fatsChosenFoods,
        "fat_cals",
        mealNutrientsCals.mealFatsTotalCals
      ),
      carbsFoods: createFoodMealByNutrientWithMealID(
        carbsChosenFoods,
        "carbs_cals",
        mealNutrientsCals.mealCarbsTotalCals
      ),
    };

    if (keepMeatMilkObj?.dairyIllegal || keepMeatMilkObj?.meatIllegal) {
      console.log(keepMeatMilkObj);
      let moreMealFoodsNutrients;
      if (keepMeatMilkObj.dairyIllegal) {
        const proteinsChosenFoodsFilterByMeat = filterArrObjBy(
          proteinsChosenFoods,
          "kosher_type",
          ["בשרי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.proteinIllegalCount
        );
        const carbsChosenFoodsFilterByMeat = filterArrObjBy(
          carbsChosenFoods,
          "kosher_type",
          ["בשרי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.carbsIllegalCount
        );
        const fatsChosenFoodsFilterByMeat = filterArrObjBy(
          fatsChosenFoods,
          "kosher_type",
          ["בשרי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.fatsIllegalCount
        );

        moreMealFoodsNutrients = {
          proteinsFoods: createFoodMealByNutrientWithMealID(
            proteinsChosenFoodsFilterByMeat,
            "protein_cals",
            mealNutrientsCals.mealProteinsTotalCals
          ),

          fatsFoods: createFoodMealByNutrientWithMealID(
            fatsChosenFoodsFilterByMeat,
            "fat_cals",
            mealNutrientsCals.mealFatsTotalCals
          ),
          carbsFoods: createFoodMealByNutrientWithMealID(
            carbsChosenFoodsFilterByMeat,
            "carbs_cals",
            mealNutrientsCals.mealCarbsTotalCals
          ),
        };
      } else {
        const proteinsChosenFoodsFilterByMeat = filterArrObjBy(
          proteinsChosenFoods,
          "kosher_type",
          ["חלבי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.proteinIllegalCount
        );
        const carbsChosenFoodsFilterByMeat = filterArrObjBy(
          carbsChosenFoods,
          "kosher_type",
          ["חלבי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.carbsIllegalCount
        );
        const fatsChosenFoodsFilterByMeat = filterArrObjBy(
          fatsChosenFoods,
          "kosher_type",
          ["חלבי", "פרווה"]
        ).slice(
          NUM_FOODS_IN_MEAL * (i + 1),
          NUM_FOODS_IN_MEAL * (i + 1) + keepMeatMilkObj.fatsIllegalCount
        );
        moreMealFoodsNutrients = {
          proteinsFoods: createFoodMealByNutrientWithMealID(
            proteinsChosenFoodsFilterByMeat,
            "protein_cals",
            mealNutrientsCals.mealProteinsTotalCals
          ),

          fatsFoods: createFoodMealByNutrientWithMealID(
            fatsChosenFoodsFilterByMeat,
            "fat_cals",
            mealNutrientsCals.mealFatsTotalCals
          ),
          carbsFoods: createFoodMealByNutrientWithMealID(
            carbsChosenFoodsFilterByMeat,
            "carbs_cals",
            mealNutrientsCals.mealCarbsTotalCals
          ),
        };
      }
      mealFoodsNutrients.proteinsFoods.push(
        ...moreMealFoodsNutrients.proteinsFoods
      );
      mealFoodsNutrients.carbsFoods.push(...moreMealFoodsNutrients.carbsFoods);
      mealFoodsNutrients.fatsFoods.push(...moreMealFoodsNutrients.fatsFoods);
    }

    return { ...newMeal, ...mealFoodsNutrients };
  });

  loggerJson.debug(`LINE 274: meals`, { __filename, objs: [meals] });
};
const nutritionQuestionnaires: NutritionQuestionnaire = {
  user_id: 2,
  allergens: [],
  black_list_foods: [],
  favorite_foods: [],
  kosher: false,
  isKeepMeatMilk: false,
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
