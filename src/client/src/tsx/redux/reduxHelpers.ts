import { getValuesArrObj } from "../utlities/helpersFun";

export const providerTag = <T extends object>(obj: T, itemTag: string) => {
  return {
    type: itemTag,
    id: getValuesArrObj(obj)[0],
  };
};

export function providerTags<T extends object>(
  data: T[] | undefined,
  itemTag: string,
  listID: string
) {
  return data
    ? [
        ...data.map((el) => providerTag(el, itemTag)),
        { type: itemTag, id: listID },
      ]
    : [{ type: itemTag, id: listID }];
}
