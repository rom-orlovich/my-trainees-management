import { writeFile, readFile } from "fs/promises";
import axios from "axios";
import { FoodNameDB, ResDataBaseFood } from "./types";
import {
  FILES_PATH,
  JSON_ENCODING_DEFAULT,
  NATIONAL_FOOD_DICT_JSON_PATH,
  URL_PATH,
} from "./constants";

export const CreateNationalProductsNamesDB = async () => {
  try {
    const curData = JSON.parse(
      await readFile(NATIONAL_FOOD_DICT_JSON_PATH, JSON_ENCODING_DEFAULT)
    ) as FoodNameDB[];
    const { length } = curData;
    const urlQuery = {
      sort: "protein desc",
      resource_id: "c3cb0630-0650-46c1-a068-82d575c094b2",
      offset: curData?.length || 0,
      limit: 500,
    };
    const urlParams = new URLSearchParams(urlQuery as Record<string, any>);
    const res = (await (
      await axios(URL_PATH.NATIONAL_FOOD_DICT_URL + urlParams)
    ).data) as ResDataBaseFood;

    console.log(curData[length - 1]?.name, res?.result?.records[0].shmmitzrach);

    if (res?.result?.records?.length)
      if (curData[length - 1]?.name !== res.result?.records[0].shmmitzrach) {
        const foodNames = [
          ...curData,
          ...res.result.records
            .filter(
              (el) =>
                el.protein > 1 && el.carbohydrates > 1 && el.total_fat > 0.5
            )
            .map((el, i) => ({
              id: i + (curData.length || 1),
              name: el.shmmitzrach,
            })),
        ];
        console.log(`start writing ${FILES_PATH.NATIONAL_FOOD_DICT} `);
        await writeFile(
          NATIONAL_FOOD_DICT_JSON_PATH,
          JSON.stringify(foodNames)
        );
      }
  } catch (error) {
    console.log(error);
  }
};
