/* eslint-disable prettier/prettier */
import { readFileSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";
import { schedule } from "node-cron";

import {
  CRON_CACHED_DATA_JSON_PATH,
  JSON_ENCODING_DEFAULT,
  PRODUCTS_LINKS_HTML_PATH,
  PRODUCT_DETAILS_HTML_PATH,
  RESULT_ADD
} from "./constants";
import { createNationalProductsNamesDB } from "./createNationalProductsNamesDB";
import { CronCachedData } from "./foodsDataScraperServiceTypes";
import {
  createFoodsListLinksDB,
  createFoodsDetailsDB
} from "./utilities/fetchHelpers";

async function beginScrapping() {
  console.log("Scraping begin");
  try {
    await mkdir(PRODUCTS_LINKS_HTML_PATH, { recursive: true });
    await mkdir(PRODUCT_DETAILS_HTML_PATH, { recursive: true });

    const cronCachedData = JSON.parse(
      readFileSync(CRON_CACHED_DATA_JSON_PATH, JSON_ENCODING_DEFAULT)
    ) as CronCachedData;

    const { fetchProductsList, fetchFoodsDetails, fetchNationalDict } =
      cronCachedData;

    // // Init National DB scrapper
    // fetchNationalDict.start += await createNationalProductsNamesDB(
    //   fetchNationalDict.start,
    //   fetchNationalDict.add
    // );

    // Init products list links scrapper.
    const productsListPos = await createFoodsListLinksDB(
      fetchProductsList.start,
      fetchProductsList.end
    );
    // Init product details scrapper.
    const productDetailsPos = await createFoodsDetailsDB(
      fetchFoodsDetails.start,
      fetchFoodsDetails.end
    );
    console.log(productsListPos, productDetailsPos);
    schedule(`*/${cronCachedData.eachMin} * * * *`, async () => {
      cronCachedData.eachMin = Math.floor(1 + Math.random() * 5);
      fetchProductsList.start += RESULT_ADD;
      fetchProductsList.end += RESULT_ADD;
      fetchFoodsDetails.start += RESULT_ADD;
      fetchFoodsDetails.end += RESULT_ADD;

      console.log("Begin fetching");

      // National DB scrapper.
      // fetchNationalDict.start += await createNationalProductsNamesDB(
      //   fetchNationalDict.start,
      //   fetchNationalDict.add
      // );

      // Products list links scrapper.
      await createFoodsListLinksDB(
        fetchProductsList.start,
        fetchProductsList.end
      );
      // Product details scrapper.
      await createFoodsDetailsDB(
        fetchFoodsDetails.start,
        fetchFoodsDetails.end
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
