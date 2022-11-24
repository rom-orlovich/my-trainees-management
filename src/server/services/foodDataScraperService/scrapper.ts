/* eslint-disable prettier/prettier */
import { readFileSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";
import { schedule } from "node-cron";
import {
  RESULT_ADD,
  CRON_CACHED_DATA_JSON_PATH,
  JSON_ENCODING_DEFAULT,
  PRODUCTS_LINKS_HTML_PATH,
  PRODUCT_DETAILS_HTML_PATH,
  LINKS_SCRAPPER_JSON_PATH,
  FOOD_DICT_DB_PATH
} from "./constants";
import { CreateNationalProductsNamesDB } from "./initDBfood";
import { CronCachedData, Food } from "./types";
import {
  createProductsListLinksDB,
  createProductDetailsDB
} from "./utilities/fetchHelpers";

async function beginScrapping() {
  console.log("Scraping begin");
  try {
    await mkdir(PRODUCTS_LINKS_HTML_PATH, { recursive: true });
    await mkdir(PRODUCT_DETAILS_HTML_PATH, { recursive: true });
    const cronCachedData = JSON.parse(
      readFileSync(CRON_CACHED_DATA_JSON_PATH, JSON_ENCODING_DEFAULT)
    ) as CronCachedData;

    const { fetchNationalDict, fetchProductsLinks } = cronCachedData;
    // Init products list links scrapper.
    await createProductsListLinksDB(
      fetchNationalDict.start,
      fetchNationalDict.end
    );
    // Init product details scrapper.
    await createProductDetailsDB(
      fetchProductsLinks.start,
      fetchProductsLinks.end
    );

    schedule(`*/${cronCachedData.eachMin} * * * *`, async () => {
      // National DB scrapper.
      await CreateNationalProductsNamesDB();
      cronCachedData.eachMin = Math.floor(1 + Math.random() * 5);
      fetchNationalDict.start += RESULT_ADD;
      fetchNationalDict.end += RESULT_ADD;
      fetchProductsLinks.start += RESULT_ADD;
      fetchProductsLinks.end += RESULT_ADD;
      console.log("Begin fetching");
      // Products list links scrapper.
      await createProductsListLinksDB(
        fetchNationalDict.start,
        fetchNationalDict.end
      );
      // Product details scrapper.
      await createProductDetailsDB(
        fetchProductsLinks.start,
        fetchProductsLinks.end
      );
      console.log("curCronCachedData", cronCachedData);
      writeFileSync(
        CRON_CACHED_DATA_JSON_PATH,
        JSON.stringify(cronCachedData),
        JSON_ENCODING_DEFAULT
      );
    });
  } catch (error) {
    console.log(error);
  }
}
// beginScrapping();

const arr = JSON.parse(
  readFileSync(FOOD_DICT_DB_PATH, JSON_ENCODING_DEFAULT)
) as Food[];

const newArr = arr
  .filter((el) => el.calories || el.calories === 0)
  .map((el, i) => {
    const proteinCals = el.proteins * 4;
    const crabsCals = el.carbohydrates * 4;
    const fatCals = el.total_fat * 9;
    return {
      ...el,
      food_id: i,
      protein_g: el.proteins || 0,
      crabs_g: el.carbohydrates || 0,
      fat_g: el.total_fat || 0,
      sodium_mg: el.sodium || 0,
      cholesterol_mg: el.cholesterol || 0,
      saturated_fat_mg: el.saturated_fat || 0,
      protein_cals: proteinCals,
      crabs_cals: crabsCals,
      fat_cals: fatCals,
      calories_total: el.calories
    };
  });

writeFileSync(FOOD_DICT_DB_PATH, JSON.stringify(newArr), JSON_ENCODING_DEFAULT);
