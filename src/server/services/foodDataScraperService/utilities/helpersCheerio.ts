import { load } from "cheerio";
import { readFileSync } from "fs";
import { URL_PATH } from "../constants";
export function createCheerioLoad(strHTML: string) {
  const htmlFile = readFileSync(strHTML, "utf-8");
  return load(htmlFile);
}

export function createProductsLinksData(pathHTML: string) {
  const $ = createCheerioLoad(pathHTML);
  const links = $(".media-body a")
    .toArray()
    .map((el) => `${URL_PATH.FOOD_DICT_URL}${el.attribs.href}`);
  return links;
}
