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
} from "./constants";
import { fetchHTML } from "./utilities/fetchHelpers";

async function beginScrapping() {
  console.log("Scraping begin");
  try {
    await mkdir(PRODUCTS_LINKS_HTML_PATH, { recursive: true });
    await mkdir(PRODUCT_DETAILS_HTML_PATH, { recursive: true });
    const cronCachedData = JSON.parse(
      readFileSync(CRON_CACHED_DATA_JSON_PATH, JSON_ENCODING_DEFAULT)
    );

    const { fetchNationalDict } = cronCachedData;
  
    await fetchHTML(fetchNationalDict.start, fetchNationalDict.end);
    schedule(`*/${cronCachedData.eachMin} * * * *`, async () => {
      cronCachedData.eachMin = Math.floor(1 + Math.random() * 5);
      fetchNationalDict.start += RESULT_ADD;
      fetchNationalDict.end += RESULT_ADD;
      console.log("Begin fetching");
      await fetchHTML(fetchNationalDict.start, fetchNationalDict.end);
      console.log("curCronCachedData",cronCachedData);
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
