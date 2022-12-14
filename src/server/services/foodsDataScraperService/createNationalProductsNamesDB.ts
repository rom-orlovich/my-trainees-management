import { writeFile, readFile } from "fs/promises";
import axios from "axios";

import { FoodNameDB, ResDataBaseFood } from "./foodsDataScraperServiceTypes";
import {
  FILES_PATH,
  JSON_ENCODING_DEFAULT,
  NATIONAL_FOOD_DICT_JSON_PATH,
  URL_PATH,
} from "./constants";

export const createNationalProductsNamesDB = async (
  start: number,
  add: number
) => {
  try {
    const curData = JSON.parse(
      await readFile(NATIONAL_FOOD_DICT_JSON_PATH, JSON_ENCODING_DEFAULT)
    ) as FoodNameDB[];
    const urlQuery = {
      sort: "carbohydrates asc",
      resource_id: "c3cb0630-0650-46c1-a068-82d575c094b2",
      offset: start,
      limit: add,
    };

    const urlParams = new URLSearchParams(urlQuery as Record<string, any>);

    const res = (await axios(URL_PATH.NATIONAL_FOOD_DICT_URL + urlParams))
      .data as ResDataBaseFood;
    console.log(URL_PATH.NATIONAL_FOOD_DICT_URL + urlParams, res?.success);

    if (res?.success) {
      console.log(
        res?.result?.records[0]?.shmmitzrach,
        "exist?",
        curData.find((el) => el.name === res?.result?.records[0]?.shmmitzrach)
      );
      if (
        res?.result?.records[0]?.shmmitzrach &&
        !curData.find((el) => el.name === res?.result?.records[0]?.shmmitzrach)
      ) {
        const foodNames = [
          ...curData,
          ...res.result.records
            .filter(
              (el) =>
                el.protein > 0.1 && el.carbohydrates > 0.1 && el.total_fat > 0.1
            )
            .map((el, i) => ({
              id: i + (curData.length || 1),
              name: el?.shmmitzrach,
            })),
        ];
        console.log(`start writing ${FILES_PATH.NATIONAL_FOOD_DICT} `);
        await writeFile(
          NATIONAL_FOOD_DICT_JSON_PATH,
          JSON.stringify(foodNames),
          JSON_ENCODING_DEFAULT
        );
      }
      return add;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
