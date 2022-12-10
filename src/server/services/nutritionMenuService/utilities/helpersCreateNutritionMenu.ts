/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { shuffle, sortBy } from "lodash";
import { selectQuery } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import {
  filterArrObjBy,
  fixNum,
  sortArrObjBy,
} from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import {
  Food,
  KosherType,
  KosherTypeWithoutPareve,
  NutrientsTypes,
} from "../../foodsDataScraperService/foodsDataScraperServiceTypes";
import { MeasuresCalResAPI } from "../../statisticService/serviceStatisticsTypes";
import { NUM_FOODS_FOR_EACH_NUTRIENTS, NUM_FOODS_IN_MEAL } from "../constants";
import {
  ChosenFoodsNutrientsArrObj,
  CreateMealFoodByNutrientWithMealIDFun,
  DietTypes,
  MealFood,
  KeepMeatAndMilkObj,
  MealNutrientsCals,
  NutrientCalsType,
  NutritionQuestionnaire,
  MealNutrientsFoodsObj,
} from "../nutritionMenuServiceTypes";

export const createMenuDescription = ({
  kosher,
  is_vegan,
  is_vegetarian,
  diet_type,
  is_keep_meat_milk,
  allergens,
  meals_calories_size_percents,
  profile_id,
  user_id,
}: NutritionQuestionnaire) => {
  const kosherText = kosher ? "כשרה" : "";
  const veganText = is_vegan ? "טבעונית" : "";
  const vegetarianText = is_vegetarian ? "צמחונית" : "";
  const is_keep_meat_milkText = is_keep_meat_milk ? "ללא בשר וחלב" : "";
  const mealsDistPercentsText = `${meals_calories_size_percents
    .map((el, i) => `meal ${i + 1} %${el}`)
    .join(", ")
    .slice(0, -1)}`;
  const allergensText = allergens
    .map((el) => `${el} ללא`)
    .join(", ")
    .slice(0, -1);

  return {
    note_text: `Type menu:${diet_type} ${kosherText} ${
      veganText || vegetarianText
    } ${is_keep_meat_milkText}`,
    note_topic: `${`${allergensText} ` || ""}${
      mealsDistPercentsText ? `meals percents: ${mealsDistPercentsText}` : ""
    } `,
    profile_id,
    user_id,
  };
};

export const matchFoodByDietType = (foods: Food[], dietType: DietTypes) => {
  if (dietType === "neutral") return foods;
  const checkDietType = dietType === "cutting";
  return sortArrObjBy(foods, "food_density", checkDietType);
};

// Gets the last measure of the user.
export const getLastMeasureByProfileID = async (
  profileID: number
): Promise<MeasuresCalResAPI | undefined> => {
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
  let i = 2;
  let checkKosherStr = "";
  let checkIsVeganStr = "";
  let checkIsVegetarianStr = "";
  if (kosher) {
    i++;
    checkKosherStr = `and kosher=$${i}`;
  }
  if (is_vegan) {
    i++;
    checkIsVeganStr = `and is_vegan=$${i}`;
  }
  if (is_vegetarian) {
    i++;
    checkIsVegetarianStr = `and is_vegetarian=$${i}`;
  }

  const blackList = black_list_foods.map((el) => el.food_id);

  const foods = (await selectQuery(
    TABLES_DATA.FOODS_TABLE_NAME,
    "*",
    `WHERE NOT food_id = ANY($1) AND NOT allergens && ($2) ${checkKosherStr}    
      ${checkIsVeganStr} ${checkIsVegetarianStr} ORDER BY food_score DESC`,
    [blackList, allergens, ...kosherArr, ...isVegan, ...isVegetarian]
  )) as Food[];

  return foods;
};

// Gets the food with the best score.
export const getBestNutrientsFoods = (
  foods: Food[],
  checkSortByDietType?: boolean,
  amount = NUM_FOODS_FOR_EACH_NUTRIENTS
) => {
  const prepareFoodByFoodDensity = (foods: Food[]) =>
    sortArrObjBy(foods, "food_density", checkSortByDietType);

  const getFoodsByNutrient = (nutrientType: NutrientsTypes) => {
    const filterByNutrient = filterArrObjBy(foods, "nutrient_type", [
      nutrientType,
    ]).slice(0, amount);

    if (checkSortByDietType === undefined) return filterByNutrient;
    return prepareFoodByFoodDensity(filterByNutrient);
  };

  const proteinsFromFoodDbRes = getFoodsByNutrient("proteins");
  const carbsFromFoodDbRes = getFoodsByNutrient("carbohydrates");
  const fatsFromFoodDbRes = getFoodsByNutrient("fats");

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
  favoriteFoods: number[],
  checkSortByDietType?: boolean
) => {
  const { carbsFromFoodDbRes, fatsFromFoodDbRes, proteinsFromFoodDbRes } =
    getBestNutrientsFoods(foods, checkSortByDietType);

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
  lastMeasure: MeasuresCalResAPI,
  mealsDistPercents: number[]
) => {
  const totalCals = lastMeasure.calories_total;
  const totalProteinCals = lastMeasure.protein_cals;
  const totalCarbsCals = lastMeasure.carbs_cals;
  const totalFatsCals = lastMeasure.fat_cals;

  const mealsNutrientsCalsDist = mealsDistPercents.map((percentsNum) => {
    const percents = percentsNum / 100;
    const mealProteinsTotalCals = fixNum(totalProteinCals * percents);
    const mealFatsTotalCals = fixNum(totalFatsCals * percents);
    const mealCarbsTotalCals = fixNum(totalCarbsCals * percents);
    const mealTotalCals = fixNum(totalCals * percents);
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
  totalCals: number,
  key: NutrientCalsType
) => {
  let amount = 1;
  let curCalNutrientCals = totalMealNutrientCals;
  if (curCalNutrientCals < food[key]) {
    return Number((curCalNutrientCals / food[key]).toFixed(2));
  }

  const checkTotal =
    key === "protein_cals" ? (totalCals * 50) / 100 : (totalCals * 25) / 100;
  let sumTotal =
    amount * food.carbs_cals + amount * food.fat_cals + food.protein_cals;
  while (curCalNutrientCals > food[key] * 2 && sumTotal < checkTotal) {
    curCalNutrientCals -= food[key];
    amount++;
    sumTotal =
      amount * food.carbs_cals + amount * food.fat_cals + food.protein_cals;
  }

  return amount;
};

// Creates food for meal.
export const createMealFood = (
  food: Food,
  mealNutrientsCals: number,
  totalCals: number,
  nutrientTypeCalsKey: NutrientCalsType,
  mealID?: number
) => {
  const amountFood = getAmountOFfood(
    food,
    mealNutrientsCals,
    totalCals,
    nutrientTypeCalsKey
  );
  return {
    food_id: food?.food_id,
    amount: amountFood,
    meal_id: mealID,
    food_name: food.food_name,
    // proteins_cals: food.protein_cals * amountFood,
    // carbs_cals: food.carbs_cals * amountFood,
    // fats_cals: food.fat_cals * amountFood,
    // totalCals: food.calories_total * amountFood,
    // food_score: food.food_score,
    // food_density: food.food_density,
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

export const createMealFoodByNutrientAndDisqualifyByMeatAndMilk = (
  nutrientFoodsArr: Food[],
  mealNutrientsCals: number,
  totalCals: number,
  nutrientTypeCalsKey: NutrientCalsType,
  mealID?: number,
  keepMeatAndMilkObj?: KeepMeatAndMilkObj,

  start = 0,
  amount = NUM_FOODS_IN_MEAL
) =>
  nutrientFoodsArr
    .slice(start, amount)
    .reduce((pre: MealFood[], food: Food) => {
      if (keepMeatAndMilkObj) {
        disableMeatOrDiaryFoods(keepMeatAndMilkObj, food);
        if (countHowManyNutrientsFoodsDisqualify(keepMeatAndMilkObj, food))
          return pre;
      }

      const mealFood = createMealFood(
        food,
        mealNutrientsCals,
        totalCals,
        nutrientTypeCalsKey,
        mealID
      );

      pre.push(mealFood);
      return pre;
    }, []);

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
      mealNutrientsCals.mealProteinsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),

    fatsFoods: createMealFoodByNutrientWithMealID(
      chosenFoodsNutrientsArrObj.fatsChosenFoods,
      "fat_cals",
      mealNutrientsCals.mealFatsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),
    carbsFoods: createMealFoodByNutrientWithMealID(
      chosenFoodsNutrientsArrObj.carbsChosenFoods,
      "carbs_cals",
      mealNutrientsCals.mealCarbsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),
  };
  return mealFoodsNutrients;
};

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
  createMealFoodByNutrientWithMealID: CreateMealFoodByNutrientWithMealIDFun,
  mealFoodsNutrients: MealNutrientsFoodsObj
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
    proteinsFoods: createMealFoodByNutrientWithMealID(
      proteinsChosenFoodsFilterByKosherType,
      "protein_cals",
      mealNutrientsCals.mealProteinsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),

    fatsFoods: createMealFoodByNutrientWithMealID(
      fatsChosenFoodsFilterByKosherType,
      "fat_cals",
      mealNutrientsCals.mealFatsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),
    carbsFoods: createMealFoodByNutrientWithMealID(
      carbsChosenFoodsFilterByKosherType,
      "carbs_cals",
      mealNutrientsCals.mealCarbsTotalCals,
      mealNutrientsCals.mealTotalCals
    ),
  };
  mealFoodsNutrients.proteinsFoods.push(
    ...moreMealFoodsNutrients.proteinsFoods
  );
  mealFoodsNutrients.carbsFoods.push(...moreMealFoodsNutrients.fatsFoods);
  mealFoodsNutrients.fatsFoods.push(...moreMealFoodsNutrients.carbsFoods);
};
