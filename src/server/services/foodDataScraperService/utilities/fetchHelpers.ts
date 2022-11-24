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
  PRODUCTS_LINKS_HTML_PATH,
  URL_PATH,
} from "../constants";
import { FoodDB } from "../types";
import {
  createProductsDetailsData,
  createProductsLinksData,
} from "./cheerioHelpers";
import { GenericRecord } from "../../../utilities/types";

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

// export async function createProductsListLinksDB(start: number, end: number) {
//   const curData = JSON.parse(
//     await readFile(NATIONAL_FOOD_DICT_JSON_PATH, JSON_ENCODING_DEFAULT)
//   ) as FoodDB[];
//   const promiseArr = curData.slice(start, end).map(
//     throat(2, async (el) => {
//       const nameTrim = el.name
//         .replace(/\s+/g, " ")
//         .trim()
//         .split(",")
//         .slice(0, 1)
//         .join("");
//       const nameSplit = nameTrim.replace(/(\")/g, "").replace(/\//g, " ");

//       const nameQuery = encoded(nameTrim);
//       const pathHTML = resolve(PRODUCTS_LINKS_HTML_PATH, `${nameSplit}.html`);
//       const fetchURL = `${URL_PATH.FOOD_DICT_URL}/FoodsSearch.php?q=${nameQuery}`;
//       return await conditionHTMLFetch(pathHTML, fetchURL);
//     })
//   );

//   return promiseArr;
// }

export async function createPromiseFetchArr<T>(
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
      return await conditionHTMLFetch(pathHTML, fetchURL);
    })
  );
  return promiseArr;
}

export async function createProductsListLinksDB(start: number, end: number) {
  try {
    const promiseArrRes = await Promise.all(
      // await createProductsListLinksDB(start, end)
      await createPromiseFetchArr(
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
        createArrDataJSON<string>(LINKS_SCRAPPER_JSON_PATH, scrapData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createProductDetailsDB(start: number, end: number) {
  try {
    const promiseArrRes = await Promise.all(
      await createPromiseFetchArr(
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
        const scrapData = createProductsDetailsData(pathHTML);
        createArrDataObjJSON<GenericRecord<any>>(FOOD_DICT_DB_PATH, scrapData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
