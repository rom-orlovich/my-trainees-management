import { CheerioAPI } from "cheerio";
import { lowerCase } from "lodash";

import { ALLERGENS_LIST, NOT_VEGAN_INGREDIENTS } from "./constants";
import { Food, NutritionType } from "./foodsDataScraperServiceTypes";
import { createCheerioLoad } from "./utilities/cheerioHelpers";

const createKeyValue = ($: ReturnType<CheerioAPI>) => {
  const aTag = $.find("a");
  if (aTag) {
    let nameValue = lowerCase(
      aTag[0].attribs.href.split("/").slice(-1).join("").split(".")[0]
    ).replace(/\s+/g, "_");
    const valueEl = $.find("[id*=currentValue]");
    const value = Number(valueEl.text() || 0);

    // For nameValue that are already exists like total fat and carbohydrates
    if (valueEl?.attr("id")?.includes("5")) return { saturated_fat: value };
    // For trans fats
    if (valueEl?.attr("id")?.includes("6")) return {};
    if (valueEl?.attr("id")?.includes("3")) return { sugars_g: value };
    if (nameValue === "cholesterol") return { cholesterol_mg: value };
    if (nameValue === "sodium") return { sodium_mg: value };
    if (nameValue === "calories") return { calories_total: value };
    if (nameValue === "proteins") {
      nameValue = "protein_g";
      return { protein_cals: value * 4, [nameValue]: value };
    }

    if (nameValue === "carbohydrates") {
      nameValue = "carbs_g";
      return { carbs_cals: value * 4, [nameValue]: value };
    }
    if (nameValue === "total_fat") {
      nameValue = "fat_g";
      return { fat_cals: value * 4, [nameValue]: value };
    }

    return { [nameValue]: value };
  }
  return {};
};

const calScoreFoodStarRank = ($: CheerioAPI) => {
  const stars = Number($("#RankAverage").text());
  return stars || 1;
};

const calIngredientFoodScore = ($: CheerioAPI) => {
  const ingredientsList = $(
    ".col-8.col-article-info > div:nth-child(1) > div > p:nth-child(3)"
  )?.text();

  const numWords = ingredientsList?.split(",")?.length;
  const neutralIngredients = $(
    "div.col-8.col-article-info > div:nth-child(1) > div"
  ).text();

  let scoreIngredient = 0;
  if (
    neutralIngredients.includes("ללא חומרים משמרים") ||
    neutralIngredients.includes("ללא צבעי מאכל")
  )
    scoreIngredient += 1;

  if (neutralIngredients.includes("צבעי מאכל טבעיים בלבד"))
    scoreIngredient += 0.5;

  if (neutralIngredients.includes("מכיל חומרים משמרים")) scoreIngredient += -1;

  return numWords ? scoreIngredient || 1 / (numWords * 0.5) : 2;
};

const calFoodScoreNutritious = (food: Food) => {
  const powProtein = food.is_vegan ? 1.8 : 2;
  const cholesterolMg = food.cholesterol_mg / 1000;
  const sodiumMg = food.sodium_mg / 1000;

  const goodFats = food.fat_g - food.saturated_fat - cholesterolMg;
  const badFats = food.saturated_fat + cholesterolMg;

  let formula =
    (food.protein_g ** powProtein || 1) /
    (((sodiumMg + badFats) * food.calories_total) / 100 || 1);

  if (food.nutrient_type === "proteins") formula /= food.carbs_g || 1;

  if (food.nutrient_type === "fats")
    formula = (formula * goodFats) / (food.carbs_g || 1);

  return formula;
};

const checkProductIsNotUpdate = (updateDateInfo: string) => {
  if (updateDateInfo) {
    const dateStr = updateDateInfo.trim().replace(/\+s/g, "");
    const year = dateStr.split(".")[2];
    if (new Date().getFullYear() - Number(year) > 3) return true;
  }
  return false;
};

const createAllergensList = (allerganElText: string) => {
  const resAllergan: string[] = [];
  ALLERGENS_LIST.forEach((el) => {
    if (allerganElText.includes(el))
      if (el === "גלוטן") {
        if (!allerganElText.includes("ללא גלוטן")) resAllergan.push(el);
      } else resAllergan.push(el);
  });
  return resAllergan;
};
const checkFoodNutritionType = (food: Food) => {
  let nutritionType = "";
  if (food.fat_g < food.protein_g && food.carbs_g < food.protein_g)
    nutritionType = "proteins";
  else if (food.protein_g < food.fat_g && food.carbs_g < food.fat_g)
    nutritionType = "fats";
  else if (food.protein_g < food.carbs_g && food.fat_g < food.carbs_g)
    nutritionType = "carbohydrates";
  return nutritionType;
};

const createFoodsNutritionValue = ($: CheerioAPI) => {
  let foodInitialValues = {} as Food;

  $("tbody:has(a[href*=Calories]) tr")
    .toArray()
    .slice(1)
    .forEach((el) => {
      const curEl = $(el);
      const checkAttr = (hrefVal: string) =>
        curEl.find(`a[href*=${hrefVal}]`).length;

      if (
        checkAttr("Calories") ||
        checkAttr("Protein") ||
        checkAttr("Carbohydrates") ||
        checkAttr("Total_Fat") ||
        checkAttr("Cholesterol") ||
        checkAttr("Sodium")
      )
        foodInitialValues = {
          ...foodInitialValues,
          ...createKeyValue(curEl),
        };
    });
  foodInitialValues = {
    ...foodInitialValues,
    nutrient_type: checkFoodNutritionType(foodInitialValues) as NutritionType,
  };

  return foodInitialValues;
};
const calFinalFoodScore = (food: Food, $: CheerioAPI) =>
  // logger.debug(`LINE:142: nut ${calFoodScoreNutritious(food)}`, { __filename });
  // logger.debug(`LINE:143: ing ${calIngredientFoodScore($)}`, { __filename });
  // logger.debug(`LINE:144: star ${calScoreFoodStarRank($) * 2}`, { __filename });

  Number(
    (
      calFoodScoreNutritious(food) * calIngredientFoodScore($) +
      calScoreFoodStarRank($)
    ).toFixed(2)
  );
const getVeganRelevantText = ($: CheerioAPI) => {
  const headerText = $("#pageHeader").text();
  const ingredientsText = $(
    "div.col-8.col-article-info > div:nth-child(1) > div"
  ).text();
  const kosherText = $("div.col-8.col-article-info > p:nth-child(4)").text();

  // logger.debug(
  //   `LINE:173: text ${headerText} ${ingredientsText} ${kosherText}`,
  //   { __filename }
  // );

  return `${headerText} ${ingredientsText} ${kosherText}`;
};
const getFoodType = (
  kosher: boolean,
  meat: boolean | string,
  pareve: boolean | string,
  foodDetails: string
) => {
  if (meat) return { is_vegan: false, is_vegetarian: false };

  if (!NOT_VEGAN_INGREDIENTS.some((el) => foodDetails.includes(el)))
    if (pareve && kosher) return { is_vegan: true, is_vegetarian: true };

  return { is_vegan: false, is_vegetarian: true };
};

const createFoodIdentity = ($: CheerioAPI) => {
  const foodDetailsText = $("div.col-8.col-article-info").text();
  const kosher = !foodDetailsText.includes("לא כשר");
  const meat = foodDetailsText.includes("בשרי") && "בשרי";
  const pareve = foodDetailsText.includes("פרווה") && "פרווה";
  const dairy = foodDetailsText.includes("חלבי") && "חלבי";
  const foodType = getFoodType(kosher, meat, pareve, getVeganRelevantText($));
  return {
    ...foodType,
    kosher,
    kosher_type: meat || dairy || pareve || "פרווה",
  };
};
const checkIfIsNotFood = (food: Food, foodScore: number) =>
  Number.isNaN(foodScore) ||
  !food.calories_total ||
  !(food.protein_cals && food.carbs_cals && food.fat_cals);

export function createFoodDetailsData(pathHTML: string) {
  const $ = createCheerioLoad(pathHTML);
  const foodName = { food_name: $("h1").text() };
  const updateDateInfo = $(".fd-info").text().split(":")[1];
  if (checkProductIsNotUpdate(updateDateInfo)) return undefined;
  const allerganElText = $(".allergic-box").text();
  const resAllergan = createAllergensList(allerganElText);

  // const allerganInNames = ALLERGENS_LIST.filter(
  //   (el) =>
  //     (!foodName.food_name.includes(`${el} ללא`) ||
  //       !foodName.food_name.includes(`${el} נטול`)) &&
  //     foodName.food_name.includes(el)
  // );
  if (
    foodName.food_name.includes("ביצה") ||
    foodName.food_name.includes("ביצים")
  )
    resAllergan.push("ביצה");
  const initialFoodValue = {
    sugars_g: 0,
    saturated_fat: 0,
    cholesterol_mg: 0,
  };

  const foodIdentity = createFoodIdentity($);

  const food = {
    ...foodName,
    ...initialFoodValue,
    ...foodIdentity,
    ...createFoodsNutritionValue($),
  };

  const foodScore = calFinalFoodScore(food, $);

  if (checkIfIsNotFood(food, foodScore)) return undefined;
  const calCaloriesDensity = (food: Food) =>
    Number((food.calories_total / 100).toFixed(2));
  return {
    ...food,
    allergens: resAllergan,
    food_density: calCaloriesDensity(food),
    food_score: foodScore,
  } as Food;
}
