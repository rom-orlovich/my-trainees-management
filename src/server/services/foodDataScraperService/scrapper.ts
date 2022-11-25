/* eslint-disable prettier/prettier */
import { readFileSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";
import { schedule } from "node-cron";
import {
  RESULT_ADD,
  CRON_CACHED_DATA_JSON_PATH,
  JSON_ENCODING_DEFAULT,
  PRODUCTS_LINKS_HTML_PATH,
  PRODUCT_DETAILS_HTML_PATH
} from "./constants";
import { createNationalProductsNamesDB } from "./initDBfood";
import { CronCachedData } from "./types";
import {
  createProductsListLinksDB,
  createProductDetailsDB
} from "./utilities/fetchHelpers";

async function beginScrapping() {
  let success: boolean | undefined;
  console.log("Scraping begin");
  try {
    await mkdir(PRODUCTS_LINKS_HTML_PATH, { recursive: true });
    await mkdir(PRODUCT_DETAILS_HTML_PATH, { recursive: true });
    const cronCachedData = JSON.parse(
      readFileSync(CRON_CACHED_DATA_JSON_PATH, JSON_ENCODING_DEFAULT)
    ) as CronCachedData;

    const { fetchProductsList, fetchProductsDetails, fetchNationalDict } =
      cronCachedData;

    // Init National DB scrapper
    fetchNationalDict.start += await createNationalProductsNamesDB(
      fetchNationalDict.start,
      fetchNationalDict.add
    );

    // Init products list links scrapper.
    await createProductsListLinksDB(
      fetchProductsList.start,
      fetchProductsList.end
    );
    // Init product details scrapper.
    await createProductDetailsDB(
      fetchProductsDetails.start,
      fetchProductsDetails.end
    );

    schedule(`*/${cronCachedData.eachMin} * * * *`, async () => {
      cronCachedData.eachMin = Math.floor(1 + Math.random() * 5);

      fetchProductsList.start += RESULT_ADD;
      fetchProductsList.end += RESULT_ADD;
      fetchProductsDetails.start += RESULT_ADD;
      fetchProductsDetails.end += RESULT_ADD;

      console.log("Begin fetching");

      // National DB scrapper.
      fetchNationalDict.start += await createNationalProductsNamesDB(
        fetchNationalDict.start,
        fetchNationalDict.add
      );
      console.log(fetchNationalDict.start);

      // Products list links scrapper.
      await createProductsListLinksDB(
        fetchProductsList.start,
        fetchProductsList.end
      );
      // Product details scrapper.
      await createProductDetailsDB(
        fetchProductsDetails.start,
        fetchProductsDetails.end
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
beginScrapping();
