import { CheerioAPI, load } from "cheerio";

import { readFileSync } from "fs";
import { lowerCase } from "lodash";
import { ALLERGENS_LIST, URL_PATH } from "../constants";
import { Food } from "../types";

export function createCheerioLoad(strHTML: string) {
  const htmlFile = readFileSync(strHTML, "utf-8");
  return load(htmlFile);
}

export function createProductsLinksData(pathHTML: string) {
  const $ = createCheerioLoad(pathHTML);
  const links = $(".media-body a")
    .toArray()
    .map((el) => `${URL_PATH.FOOD_DICT_URL}${el.attribs.href}`);
  return links;
}

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
      nameValue = "crabs_g";
      return { crabs_cals: value * 4, [nameValue]: value };
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
  const stars = Number($("#RankAverage").text() || 0);

  return stars;
};

const calIngredientFoodScore = ($: CheerioAPI) => {
  const ingredientsList = $(
    ".col-8.col-article-info > div:nth-child(1) > div > p:nth-child(3)"
  )?.text();

  const numWords = ingredientsList?.split(",")?.length || 0;

  const neutralIngredients = $(
    "div.col-8.col-article-info > div:nth-child(1) > div"
  ).text();

  let scoreIngredient = 0;
  if (neutralIngredients.includes("צבעי מאכל טבעיים בלבד"))
    scoreIngredient += 5;
  if (neutralIngredients.includes("ללא חומרים משמרים")) scoreIngredient += 10;
  if (neutralIngredients.includes("ללא צבעי מאכל")) scoreIngredient += 10;
  if (neutralIngredients.includes("מכיל חומרים משמרים")) scoreIngredient += -10;

  return scoreIngredient / numWords;
};

const calFoodScoreNutritious = (food: Food) => {
  const badValues =
    food.crabs_g * 0.6 +
    food.saturated_fat +
    food.cholesterol_mg / 1000 +
    food.sodium_mg / 1000;

  const goodValues =
    food.protein_g ** 1.5 +
    (food.fat_g - food.saturated_fat - food.cholesterol_mg / 1000);

  return goodValues / badValues;
};

const calFinalFoodScore = (food: Food, $: CheerioAPI) =>
  Number(
    (
      calFoodScoreNutritious(food) +
      calIngredientFoodScore($) +
      2 * calScoreFoodStarRank($)
    ).toFixed(2)
  );

export function createFoodDetailsData(pathHTML: string) {
  const $ = createCheerioLoad(pathHTML);
  const foodName = $("h1").text();
  const updateDateInfo = $(".fd-info").text().split(":")[1];

  if (updateDateInfo) {
    const dateStr = updateDateInfo.trim().replace(/\+s/g, "");
    const year = dateStr.split(".")[2];

    if (new Date().getFullYear() - Number(year) > 3) return undefined;
  }

  const allerganElText = $(".allergic-box").text();

  const resAllergan: string[] = [];

  ALLERGENS_LIST.forEach((el) => {
    if (allerganElText.includes(el))
      if (el === "גלוטן") {
        if (!allerganElText.includes("ללא גלוטן")) resAllergan.push(el);
      } else resAllergan.push(el);
  });

  let foodInitialValues = {
    food_name: foodName,
    calories_total: 0,
    protein_g: 0,
    protein_cals: 0,
    crabs_g: 0,
    crabs_cals: 0,
    sugars_g: 0,
    fat_g: 0,
    fat_cals: 0,
    saturated_fat: 0,
    cholesterol_mg: 0,
    sodium_mg: 0,
    food_type: "carbohydrates",
    allergens: [],
    kosher: true,
    kosher_type: "פרווה",
    food_score: 0,
  } as Food;

  const kosher = $("p").text().includes("לא כשר");
  const meat = $("p").text().includes("בשרי") && "בשרי";
  const pareve = $("p").text().includes("פרווה") && "פרווה";
  const dairy = $("p").text().includes("חלבי") && "חלבי";

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
          allergens: resAllergan,
          kosher: !kosher,
          kosher_type: meat || dairy || pareve || "פרווה",
        };
    });
  let foodType = "";

  if (
    foodInitialValues.fat_g < foodInitialValues.protein_g &&
    foodInitialValues.crabs_g < foodInitialValues.protein_g
  )
    foodType = "proteins";
  else if (
    foodInitialValues.protein_g < foodInitialValues.fat_g &&
    foodInitialValues.crabs_g < foodInitialValues.fat_g
  )
    foodType = "fats";
  else if (
    foodInitialValues.protein_g < foodInitialValues.crabs_g &&
    foodInitialValues.fat_g < foodInitialValues.crabs_g
  )
    foodType = "carbohydrates";
  const foodScore = calFinalFoodScore(foodInitialValues, $);

  if (isNaN(foodScore) || foodScore === 0) return undefined;
  return {
    ...foodInitialValues,
    food_type: foodType,
    food_score: foodScore,
  };
}
