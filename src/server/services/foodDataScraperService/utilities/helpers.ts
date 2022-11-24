import { readFileSync, writeFileSync } from "fs";

import { JSON_ENCODING_DEFAULT } from "../constants";
function mapStr() {
  let mapEncoded = {} as Record<any, any>;
  let mapDecoded = { " ": "+", ",": "%2C", '"': '"' } as Record<any, any>;
  let ab = "אבגדהוזחטיכלמנסעפצקרשתןםףץך";
  let sym =
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
    .reduce((pre, cur) => {
      return pre + mapEncoded[`%${cur}`];
    }, "");
}
export function encoded(decode: string) {
  return decode.split("").reduce((pre: string, cur) => {
    return pre + (mapDecoded[`${cur}`] || cur);
  }, "");
}

export async function createDecodedHTMLFile(pathHTML: string, data: any) {
  const decode = new TextDecoder("windows-1255");
  let strHtml = decode.decode(data).replace(/\s+/g, " ");

  writeFileSync(pathHTML, strHtml, "utf8");
}

export function createArrDataJSON(pathJSON: string, scrapData: any[]) {
  const curData = JSON.parse(
    readFileSync(pathJSON, { encoding: "utf-8" })
  ) as string[];

  writeFileSync(
    pathJSON,
    JSON.stringify([...curData, ...scrapData]),
    JSON_ENCODING_DEFAULT
  );
}
