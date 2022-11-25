import { CheerioAPI, load } from "cheerio";

import { readFileSync } from "fs";
import { lowerCase } from "lodash";
import { URL_PATH } from "../constants";

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
    if (valueEl?.attr("id")?.includes("5")) return { saturated_fat: value };
    if (valueEl?.attr("id")?.includes("3")) return { sugars_g: value };

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

export function createProductsDetailsData(pathHTML: string) {
  const $ = createCheerioLoad(pathHTML);
  const productName = $("h1").text();
  const allerganElText = $(".allergic-box").text();
  const resAllergan: string[] = [];
  const allerganList = [
    "גלוטן",
    "סויה",
    "שומשום",
    "בוטנים",
    "חיטה",
    "אגוזים",
    "ביצה",
    "סולפיט",
    "ביצים",
    "חלב",
    "שקדים",
    "אגוזי לוז",
    "אגוזי פקאן",
    "קוקוס",
    "קשיו",
    "לוז",
    "פקאן",
    "חרדל",
    "סלרי",
  ];
  allerganList.forEach((el) => {
    if (allerganElText.includes(el))
      if (el === "גלוטן" && !allerganElText.includes("ללא גלוטן"))
        resAllergan.push(el);
      else resAllergan.push(el);
  });

  let values = {
    product_name: productName,
    calories_total: 0,
    protein_g: 0,
    protein_cals: 0,
    crabs_g: 0,
    crabs_cals: 0,
    sugars_g: 0,
    fat_g: 0,
    fat_cals: 0,
    saturated_fat_mg: 0,
    cholesterol_mg: 0,
    sodium_mg: 0,
    food_type: "",
    allergens: [],
    kosher: true,
    kosher_type: "פרווה",
  } as any;

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
        values = {
          ...values,
          ...createKeyValue(curEl),
          allergens: resAllergan,
          kosher: !kosher,
          kosher_type: meat || dairy || pareve || null,
        };
    });
  let foodType = "";

  if (
    values.proteins > values.carbohydrates &&
    values.proteins > values.total_fat
  )
    foodType = "proteins";
  else if (
    values.proteins < values.total_fat &&
    values.carbohydrates < values.total_fat
  )
    foodType = "fats";
  else if (
    values.proteins < values.carbohydrates &&
    values.total_fat < values.carbohydrates
  )
    foodType = "carbohydrates";

  return { ...values, food_type: foodType };
}
