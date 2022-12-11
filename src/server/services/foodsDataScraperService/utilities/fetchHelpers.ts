/* eslint-disable no-console */
/* eslint-disable no-return-await */
import axios from "axios";
import { readFile, stat } from "fs/promises";
import throat from "throat";

import {
  createArrDataJSON,
  createArrDataObjJSON,
  createDecodedHTMLFile,
  createProductDetailsHTMLAndFetchURL,
  createProductLinksHTMLandFetchURL,
} from "./helpers";
import {
  FOOD_DICT_DB_PATH,
  JSON_ENCODING_DEFAULT,
  LINKS_SCRAPPER_JSON_PATH,
  NATIONAL_FOOD_DICT_JSON_PATH,
} from "../constants";

import { createProductsLinksData } from "./cheerioHelpers";
import { GenericRecord } from "../../../utilities/types";
import { createFoodDetailsData } from "../createFoodDetails";
import { logger } from "../../loggerService/logger";

export const getHtml = async (url: string) => {
  const html = await axios.request({
    method: "GET",
    url,
    responseType: "arraybuffer",
    responseEncoding: "binary",
  });
  return html;
};

export async function conditionHTMLFetch(pathHTML: string, fetchURL: string) {
  const exist = stat(pathHTML);
  const defaultReturn = { pathHTML: "", data: undefined };
  try {
    await exist;
    console.log("exist", pathHTML);
    return defaultReturn;
  } catch (error) {
    if (error) {
      console.log(`fetch from ${fetchURL}`);
      const data = await getHtml(`${fetchURL}`);
      return { pathHTML, data: data.data };
    }
    return defaultReturn;
  }
}

export async function createPromiseHTMLFetchArr<T>(
  start: number,
  end: number,
  readFilePath: string,
  cb: (data: T) => {
    pathHTML: string;
    fetchURL: string;
  }
) {
  const curData = JSON.parse(
    await readFile(readFilePath, JSON_ENCODING_DEFAULT)
  ) as T[];

  const promiseArr = curData.slice(start, end).map(
    throat(2, async (el) => {
      const { fetchURL, pathHTML } = cb(el);

      return conditionHTMLFetch(pathHTML, fetchURL);
    })
  );
  return promiseArr;
}

export async function createFoodsListLinksDB(start: number, end: number) {
  let lengthFoodsListLinks: number = start;
  try {
    const promiseArrRes = await Promise.all(
      await createPromiseHTMLFetchArr(
        start,
        end,
        NATIONAL_FOOD_DICT_JSON_PATH,
        createProductLinksHTMLandFetchURL
      )
    );
    promiseArrRes.forEach((el) => {
      if (el?.pathHTML) {
        const { pathHTML } = el;
        console.log(`begin writing `, pathHTML);
        createDecodedHTMLFile(pathHTML, el.data);
        console.log(`finish writing `, pathHTML);
        const scrapData = createProductsLinksData(pathHTML);
        lengthFoodsListLinks = createArrDataJSON<string>(
          LINKS_SCRAPPER_JSON_PATH,
          scrapData
        );
      }
    });
    return lengthFoodsListLinks;
  } catch (error) {
    console.log(error);
    return start;
  }
}

export async function createFoodsDetailsDB(start: number, end: number) {
  let lengthFoodsDetailsDB: number = start;
  try {
    const promiseArrRes = await Promise.all(
      await createPromiseHTMLFetchArr(
        start,
        end,
        LINKS_SCRAPPER_JSON_PATH,
        createProductDetailsHTMLAndFetchURL
      )
    );
    promiseArrRes.forEach((el) => {
      if (el?.pathHTML) {
        const { pathHTML } = el;
        console.log(`begin writing `, pathHTML);
        createDecodedHTMLFile(pathHTML, el.data);
        console.log(`finish writing `, pathHTML);
        const scrapData = createFoodDetailsData(pathHTML);
        console.log("scrapData", scrapData);
        if (scrapData) {
          lengthFoodsDetailsDB = createArrDataObjJSON(
            FOOD_DICT_DB_PATH,
            scrapData
          );
        }
      }
    });
    return lengthFoodsDetailsDB;
  } catch (error) {
    console.log(error);
    return start;
  }
}
