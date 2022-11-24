import axios from "axios";
import { readFile, stat } from "fs/promises";
import { createArrDataJSON, createDecodedHTMLFile, encoded } from "./helpers";
import throat from "throat";
import {
  LINKS_SCRAPPER_JSON_PATH,
  NATIONAL_FOOD_DICT_JSON_PATH,
  PRODUCTS_LINKS_HTML_PATH,
  URL_PATH,
} from "../constants";
import { FoodDB } from "../types";
import { resolve } from "path";
import { createProductsLinksData } from "./helpersCheerio";

export const getHtml = async (url: string) => {
  const html = await axios.request({
    method: "GET",
    url: url,
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });
  return html;
};

export async function conditionHTMLFetch(pathHTML: string, fetchURL: string) {
  const exist = stat(pathHTML);
  try {
    await exist;
  } catch (value_1) {
    if (value_1) {
      console.log(`fetch from ${fetchURL}`);
      const data = await getHtml(`${fetchURL}`);
      return { pathHTML, data: data.data };
    }
  }
}

export async function fetchNationalFoodDict(start: number, end: number) {
  const curData = JSON.parse(
    await readFile(NATIONAL_FOOD_DICT_JSON_PATH, { encoding: "utf-8" })
  ) as FoodDB[];
  const promiseArr = curData.slice(start, end).map(
    throat(2, async (el) => {
      const nameTrim = el.name
        .replace(/\s+/g, " ")
        .trim()
        .split(",")
        .slice(0, 1)
        .join("");
      const nameSplit = nameTrim.replace(/\"/, "");
      const nameQuery = encoded(nameTrim);
      const pathHTML = resolve(PRODUCTS_LINKS_HTML_PATH, `${nameSplit}.html`);
      const fetchURL = `${URL_PATH.FOOD_DICT_URL}/FoodsSearch.php?q=${nameQuery}`;
      return await conditionHTMLFetch(pathHTML, fetchURL);
    })
  );

  return promiseArr;
}
export async function fetchHTML(start: number, end: number) {
  try {
    const promiseArrRes = await Promise.all(
      await fetchNationalFoodDict(start, end)
    );
    promiseArrRes.forEach((el) => {
      if (el?.pathHTML) {
        const { pathHTML } = el;
        console.log(`begin writing `, pathHTML);
        createDecodedHTMLFile(pathHTML, el.data);
        console.log(`finish writing `, pathHTML);

        const scrapData = createProductsLinksData(pathHTML);
        createArrDataJSON(LINKS_SCRAPPER_JSON_PATH, scrapData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
