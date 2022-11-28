/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { shuffle, sortBy } from "lodash";
import { selectQuery } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/constants";
import { filterArrObjBy, sortArrObjBy } from "../../utilities/helpers";
import { GenericRecord } from "../../utilities/types";
import {
  Food,
  KosherType,
  KosherTypeWithoutPareve,
  NutritionType,
} from "../foodsDataScraperService/types";
import { MeasuresCalResAPI } from "../statisticService/serviceStatisticsTypes";
import { NUM_FOODS_FOR_EACH_NUTRIENTS, NUM_FOODS_IN_MEAL } from "./constants";
import {
  ChosenFoodsNutrientsArrObj,
  CreateFoodMealByNutrientWithMealIDFun,
  DietTypes,
  FoodMeal,
  KeepMeatAndMilkObj,
  MealNutrientsCals,
  NutrientCalsType,
  NutritionQuestionnaire,
} from "./types";

export const matchFoodByDietType = (foods: Food[], dietType: DietTypes) => {
  if (dietType === "neutral") return foods;
  const checkDietType = dietType === "cutting";
  return sortArrObjBy(foods, "food_density", checkDietType);
};

// Gets the last measure of the user.
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

// Gets foods from the db filter by user's nutrition questionnaire.
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

// Gets the food with the best score.
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

// Creates the user's favorite foods filter by his nutrition questionnaire
// and divided by nutrients.
export const createFavoriteFoodsNutrientsArr = (
  favoriteFoods: number[],
  foods: Food[]
) => {
  const proteinsFromFavoriteFood: Food[] = [];
  const fatsFromFavoriteFood: Food[] = [];
  const carbsFromFavoriteFood: Food[] = [];

  const mapFavoriteFood = sortBy(favoriteFoods).reduce((obj, foodID) => {
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

// Creates the potential menu foods divided by nutrients
export const createChosenFoodsNutrientsArr = (
  foods: Food[],
  favoriteFoods: number[]
) => {
  const { carbsFromFoodDbRes, fatsFromFoodDbRes, proteinsFromFoodDbRes } =
    getBestNutrientsFoods(foods, NUM_FOODS_FOR_EACH_NUTRIENTS);

  const {
    carbsFromFavoriteFood,
    fatsFromFavoriteFood,
    proteinsFromFavoriteFood,
  } = createFavoriteFoodsNutrientsArr(favoriteFoods, foods);

  // Shuffles the user's favorite foods with the most score foods.
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
  return { proteinsChosenFoods, fatsChosenFoods, carbsChosenFoods };
};

// Creates for each meals it's nutrients calories distribution by user's preference.
// The function get percents array of the relative size of each meal.
// For example [50,25,25].
export const createMealsNutrientsCalsDistribution = async (
  profileID: number,
  mealsDistPercents: number[]
) => {
  const lastMeasure = await getLastMeasureByProfileID(profileID);

  const totalCals = lastMeasure.calories_total;
  const totalProteinCals = lastMeasure.protein_cals;
  const totalCarbsCals = lastMeasure.carbs_cals;
  const totalFatsCals = lastMeasure.fat_cals;

  const mealsNutrientsCalsDist = mealsDistPercents.map((percentsNum) => {
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
  return mealsNutrientsCalsDist;
};

// Gets the amount of each food takes in order to get his max nutrient calories.
export const getAmountOFfood = (
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

// Creates food for meal.
export const createFoodMeal = (
  food: Food,
  mealNutrientsCals: number,
  nutrientTypeCalsKey: NutrientCalsType,
  mealID?: number
) => {
  const amountFood = getAmountOFfood(
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

// Disable foods that are dairy if the the first food of the meal is meat.
// Disable foods that are meat if the the first food of the meal is dairy.
export const disableMeatOrDiaryFoods = (
  keepMeatAndMilkObj: KeepMeatAndMilkObj,
  food: Food
) => {
  if (!keepMeatAndMilkObj.meatIllegal && food.kosher_type === "בשרי") {
    keepMeatAndMilkObj.dairyIllegal = true;
  } else if (!keepMeatAndMilkObj.dairyIllegal && food.kosher_type === "חלבי") {
    keepMeatAndMilkObj.meatIllegal = true;
  }
};

// Counts how many food are illegal from each type of food.
export const countHowManyNutrientsFoodsDisqualify = (
  keepMeatAndMilkObj: KeepMeatAndMilkObj,
  food: Food
) => {
  if (
    (keepMeatAndMilkObj.meatIllegal && food.kosher_type === "בשרי") ||
    (keepMeatAndMilkObj.dairyIllegal && food.kosher_type === "חלבי")
  ) {
    if (food.nutrient_type === "proteins")
      keepMeatAndMilkObj.proteinIllegalCount++;
    if (food.nutrient_type === "fats") keepMeatAndMilkObj.fatsIllegalCount++;
    if (food.nutrient_type === "carbohydrates")
      keepMeatAndMilkObj.carbsIllegalCount++;
    return true;
  }
  return false;
};

export const createFoodMealByNutrientAndDisqualifyByMeatAndMilk = (
  nutrientFoodsArr: Food[],
  mealNutrientsCals: number,
  nutrientTypeCalsKey: NutrientCalsType,
  mealID?: number,
  keepMeatAndMilkObj?: KeepMeatAndMilkObj,
  start = 0,
  amount = NUM_FOODS_IN_MEAL
) =>
  nutrientFoodsArr
    .slice(start, amount)
    .reduce((pre: FoodMeal[], food: Food) => {
      if (keepMeatAndMilkObj) {
        disableMeatOrDiaryFoods(keepMeatAndMilkObj, food);
        if (countHowManyNutrientsFoodsDisqualify(keepMeatAndMilkObj, food))
          return pre;
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

// Creates filter nutrient foods array by kosher type and index where to start.
export const createFilterNutrientsFoodsArrByKosherType = (
  chosenFoodsNutrientsArrObj: ChosenFoodsNutrientsArrObj,
  kosherType: KosherTypeWithoutPareve,
  keepMeatAndMilkObj: KeepMeatAndMilkObj,
  i: number
) => {
  const KosherTypesArr: KosherType[] = ["פרווה", kosherType];
  const { carbsChosenFoods, fatsChosenFoods, proteinsChosenFoods } =
    chosenFoodsNutrientsArrObj;
  const proteinsChosenFoodsFilterByKosherType = filterArrObjBy(
    proteinsChosenFoods,
    "kosher_type",
    KosherTypesArr
  ).slice(
    NUM_FOODS_IN_MEAL * (i + 1),
    NUM_FOODS_IN_MEAL * (i + 1) + keepMeatAndMilkObj.proteinIllegalCount
  );
  const carbsChosenFoodsFilterByKosherType = filterArrObjBy(
    carbsChosenFoods,
    "kosher_type",
    KosherTypesArr
  ).slice(
    NUM_FOODS_IN_MEAL * (i + 1),
    NUM_FOODS_IN_MEAL * (i + 1) + keepMeatAndMilkObj.carbsIllegalCount
  );
  const fatsChosenFoodsFilterByKosherType = filterArrObjBy(
    fatsChosenFoods,
    "kosher_type",
    KosherTypesArr
  ).slice(
    NUM_FOODS_IN_MEAL * (i + 1),
    NUM_FOODS_IN_MEAL * (i + 1) + keepMeatAndMilkObj.fatsIllegalCount
  );

  return {
    proteinsChosenFoodsFilterByKosherType,
    carbsChosenFoodsFilterByKosherType,
    fatsChosenFoodsFilterByKosherType,
  };
};

// Fill more foods in the meals for each food that was disqualify by role of keep meat and milk.
export const createMoreMealFoodsNutrientsForEachDisqualifiedFood = (
  mealNutrientsCals: MealNutrientsCals,
  keepMeatAndMilkObj: KeepMeatAndMilkObj,
  chosenFoodsNutrientsArrObj: ChosenFoodsNutrientsArrObj,
  i: number,
  createFoodMealByNutrientWithMealID: CreateFoodMealByNutrientWithMealIDFun
) => {
  if (!(keepMeatAndMilkObj?.dairyIllegal || keepMeatAndMilkObj?.meatIllegal))
    return {
      proteinsFoods: [],
      fatsFoods: [],
      carbsFoods: [],
    };
  const checkIllegalKosherType: KosherTypeWithoutPareve =
    keepMeatAndMilkObj.dairyIllegal ? "בשרי" : "חלבי";

  const {
    proteinsChosenFoodsFilterByKosherType,
    fatsChosenFoodsFilterByKosherType,
    carbsChosenFoodsFilterByKosherType,
  } = createFilterNutrientsFoodsArrByKosherType(
    chosenFoodsNutrientsArrObj,
    checkIllegalKosherType,
    keepMeatAndMilkObj,
    i
  );

  const moreMealFoodsNutrients = {
    proteinsFoods: createFoodMealByNutrientWithMealID(
      proteinsChosenFoodsFilterByKosherType,
      "protein_cals",
      mealNutrientsCals.mealProteinsTotalCals
    ),

    fatsFoods: createFoodMealByNutrientWithMealID(
      fatsChosenFoodsFilterByKosherType,
      "fat_cals",
      mealNutrientsCals.mealFatsTotalCals
    ),
    carbsFoods: createFoodMealByNutrientWithMealID(
      carbsChosenFoodsFilterByKosherType,
      "carbs_cals",
      mealNutrientsCals.mealCarbsTotalCals
    ),
  };

  return moreMealFoodsNutrients;
};
