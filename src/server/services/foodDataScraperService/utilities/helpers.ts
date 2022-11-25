import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { GenericRecord } from "../../../utilities/types";

import {
  JSON_ENCODING_DEFAULT,
  PRODUCTS_LINKS_HTML_PATH,
  PRODUCT_DETAILS_HTML_PATH,
  URL_PATH,
} from "../constants";
import { FoodNameDB } from "../types";

function mapStr() {
  let mapEncoded = {} as Record<any, any>;
  let mapDecoded = {
    " ": "+",
    ",": "%2C",
    '"': '"',
  } as Record<any, any>;
  const ab = "אבגדהוזחטיכלמנסעפצקרשתןםףץך";
  const sym =
    "E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EB%EC%EE%F0%F1%F2%F4%F6%F7%F8%F9%FA%EF%ED%F3%F5%EA".split(
      "%"
    );
  sym.forEach((el, i) => {
    mapEncoded = { ...mapEncoded, [`%${el}`]: ab[i] };
    mapDecoded = { ...mapDecoded, [ab[i]]: `%${el}` };
  });

  return { mapEncoded, mapDecoded };
}
export const { mapDecoded, mapEncoded } = mapStr();

export function decoded(encode: string) {
  return encode
    .slice(1)
    .split("%")
    .reduce((pre, cur) => pre + mapEncoded[`%${cur}`], "");
}
export function encoded(decode: string) {
  return decode
    .split("")
    .reduce((pre: string, cur) => pre + (mapDecoded[`${cur}`] || cur), "");
}

export async function createDecodedHTMLFile(pathHTML: string, data: any) {
  const decode = new TextDecoder("windows-1255");
  const strHtml = decode.decode(data).replace(/\s+/g, " ");
  writeFileSync(pathHTML, strHtml, "utf8");
}

export function createArrDataJSON<T>(pathJSON: string, scrapData: any[]) {
  const curData = JSON.parse(
    readFileSync(pathJSON, JSON_ENCODING_DEFAULT)
  ) as T[];

  writeFileSync(
    pathJSON,
    JSON.stringify([...curData, ...scrapData]),
    JSON_ENCODING_DEFAULT
  );
}
export function createArrDataObjJSON<T>(pathJSON: string, scrapData: T) {
  const curData = JSON.parse(
    readFileSync(pathJSON, JSON_ENCODING_DEFAULT)
  ) as T[];

  writeFileSync(
    pathJSON,
    JSON.stringify([...curData, { food_id: curData.length + 1, ...scrapData }]),
    JSON_ENCODING_DEFAULT
  );
}

export const createProductLinksHTMLandFetchURL = (el: FoodNameDB) => {
  const nameTrim = el.name
    .replace(/\s+/g, " ")
    .trim()
    .split(",")
    .slice(0, 1)
    .join("");
  const nameSplit = nameTrim.replace(/(\")/g, "").replace(/\//g, " ");
  const nameQuery = encoded(nameTrim);
  const pathHTML = resolve(PRODUCTS_LINKS_HTML_PATH, `${nameSplit}.html`);
  const fetchURL = `${URL_PATH.FOOD_DICT_URL}/FoodsSearch.php?q=${nameQuery}`;
  return { pathHTML, fetchURL };
};

export const createProductDetailsHTMLAndFetchURL = (el: string) => {
  const nameSplit = el.split("/").slice(-1);
  const pathHTML = resolve(PRODUCT_DETAILS_HTML_PATH, `${nameSplit}.html`);
  return { pathHTML, fetchURL: el };
};
