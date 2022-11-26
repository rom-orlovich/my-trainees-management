/* eslint-disable no-unused-vars */
import { resolve } from "path";

export const RESULT_ADD = 20;
export const JSON_ENCODING_DEFAULT = "utf8";
export enum FILES_PATH {
  JSON_FOLDER_PATH = "JSON",
  NATIONAL_FOOD_DICT = "nationalFoodDict.json",
  LINKS_SCRAPPER = "productsLinks.json",
  CRON_CACHED_DATA = "cronCachedData.json",
  FOOD_DICT_DB = "foodDictDB.json",

  HTML_FOLDER = "HTML",
  PRODUCT_LINKS = "productsList",
  PRODUCT_DETAILS = "productsDetails",
}

export enum URL_PATH {
  NATIONAL_FOOD_DICT_URL = "https://data.gov.il/api/3/action/datastore_search?",
  FOOD_DICT_URL = "https://www.foodsdictionary.co.il",
}
export const JSON_FOLDER_PATH = resolve(__dirname, FILES_PATH.JSON_FOLDER_PATH);
export const HTML_FOLDER_PATH = resolve(__dirname, FILES_PATH.HTML_FOLDER);

export const NATIONAL_FOOD_DICT_JSON_PATH = resolve(
  JSON_FOLDER_PATH,
  FILES_PATH.NATIONAL_FOOD_DICT
);
export const LINKS_SCRAPPER_JSON_PATH = resolve(
  JSON_FOLDER_PATH,
  FILES_PATH.LINKS_SCRAPPER
);
export const FOOD_DICT_DB_PATH = resolve(
  JSON_FOLDER_PATH,
  FILES_PATH.FOOD_DICT_DB
);
export const CRON_CACHED_DATA_JSON_PATH = resolve(
  JSON_FOLDER_PATH,
  FILES_PATH.CRON_CACHED_DATA
);

export const PRODUCTS_LINKS_HTML_PATH = resolve(
  HTML_FOLDER_PATH,
  FILES_PATH.PRODUCT_LINKS
);
export const PRODUCT_DETAILS_HTML_PATH = resolve(
  HTML_FOLDER_PATH,
  FILES_PATH.PRODUCT_DETAILS
);

export const ALLERGENS_LIST = [
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
