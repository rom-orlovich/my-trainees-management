/* eslint-disable default-param-last */
/* eslint-disable guard-for-in */
// Makes string from the keys of the obj.

import { SelectPaginationQueryParam } from "../services/CRUDService/serviceCRUDTypes";
import { createObjKeysArr, createObjValuesArr } from "../utilities/helpers";

// This string is used as fieldName in update/insert functions.
export const prepareFieldsName = (obj: Record<string, any>) => {
  const keys = createObjKeysArr(obj);
  return keys.reduce((pre, cur) => `${pre}${cur},`, "").slice(0, -1);
};

// Makes string from the value of the obj.
// This string is used as the values in insert functions.
export const prepareValuesToInsert = (
  obj: Record<string, any>,
  startParma = 1
) => {
  const values = createObjValuesArr(obj);
  let fieldParams = "";
  let lastIndex = 0;
  const paramsArr = [] as any;
  values.forEach((value, index) => {
    fieldParams += `$${index + startParma},`;
    paramsArr.push(value);
    lastIndex++;
  });

  return {
    fieldParams: `(${fieldParams.slice(0, -1)})`,
    paramsArr,
    lastIndex,
  };
};

// Makes string from the key-value  of object.
// This string is used as the  key-values in update functions.
export const prepareKeyValuesToUpdate = (
  obj: Record<string, any>,
  startIndex = 0
) => {
  let keyValuesStr = "";
  const paramsArr = [] as any;
  const keysValuesEntries = Object.entries(obj);
  keysValuesEntries.forEach(([key, value], index) => {
    keyValuesStr += `${key}=$${index + startIndex},`;
    paramsArr.push(value);
  });

  return { keyValuesStr: ` ${keyValuesStr.slice(0, -1)}`, paramsArr };
};
// Create from the query params of the request and
//  from the real queries names a new obj which contains the table column name
// and his value for the select query.
export const prepareRealQueryKeyValuesObj = (
  queryFromReq: Record<string, any> | undefined,
  fakeQueryName: Record<string, string> | undefined
) => {
  if (!queryFromReq || !fakeQueryName) return {};
  if (!createObjKeysArr(queryFromReq)[0]) return {};

  let newRealQueryKeyValueObj = {} as Record<string, any>;
  for (const key in fakeQueryName) {
    // Created  key value obj which the first key is the key with the concat value of the query
    // and the other keys will concat to his key to create the concat name string for the query.

    if (queryFromReq[key] || (!queryFromReq[key] && key === "secName")) {
      const newKeyValue = key.includes("diff")
        ? {
            [`${fakeQueryName[key]}-diff`]: queryFromReq[key], // for != operator
          }
        : {
            [fakeQueryName[key]]: queryFromReq[key],
          };

      newRealQueryKeyValueObj = {
        ...newRealQueryKeyValueObj,
        ...newKeyValue,
      };
    }
  }

  return newRealQueryKeyValueObj;
};

// Concat the obj query keys that belong to queryName.
export const concatQueryWithName = (
  keysValuesEntries: [string, any][],
  startIndex = 0
) => {
  if (keysValuesEntries.length === 0)
    return { columnsNameStr: "", valueNameParam: [] };
  const columnsArr = [] as string[];
  keysValuesEntries.forEach(([key, _]) => {
    columnsArr.push(key);
  });

  const columnsNameStr = `concat(${columnsArr.join(
    ",' '," // for space between words in concatenation
  )}) ILIKE $${startIndex} `; // EXAM: concat(first_name ,' ', last_name) ILIKE $1;

  // keysValuesEntries[0][1] is the value of the concatenation from the client
  return {
    columnsNameStr,
    valueNameParam: [`%${keysValuesEntries[0][1] || ""}%`],
  };
};

// Makes string from the key-value names of object.
// This string is used as the  key-values in 'where query' in select queries statement.
export const prepareKeyValuesOfNameToSelect = (
  queryNameParams: Record<string, any>,
  startIndex = 0
) => {
  if (Object.keys(queryNameParams).length === 0)
    return { keyValuesOfNameStrArr: [], paramsNamesArr: [] };

  const keysValuesEntries = Object.entries(queryNameParams);

  const { columnsNameStr, valueNameParam } = concatQueryWithName(
    keysValuesEntries,
    startIndex
  );

  return {
    keyValuesOfNameStrArr: [`${columnsNameStr}`],
    paramsNamesArr: valueNameParam,
  };
};

export const prepareComparisonParamsStatement = (
  comparisonQuery: {
    gt: string[];
    lt: string[];
  },
  queryParamsRes: any[]
) => {
  const comparisonGreater = comparisonQuery?.gt[1]
    ? [`${comparisonQuery?.gt[0]} >= $${queryParamsRes.length + 1}`]
    : [];

  comparisonQuery?.gt[1] && queryParamsRes.push(comparisonQuery?.gt[1]);

  const comparisonLesser = comparisonQuery?.lt[1]
    ? [`${comparisonQuery?.lt[0]} <= $${queryParamsRes.length + 1}`]
    : [];

  comparisonQuery?.lt[1] && queryParamsRes.push(comparisonQuery?.lt[1]);

  const comparisonStatementStr = [
    ...comparisonGreater,
    ...comparisonLesser,
  ].join(" and ");

  return comparisonStatementStr;
};

// Makes string from the key-value of other columns of table.
// This string is used as the  key-values in 'where query' in select queries statement.
export const prepareKeyValuesOtherColumnToSelect = (
  queryParams: Record<string, any>,
  startIndex = 0
) => {
  if (Object.keys(queryParams).length === 0)
    return { keyValuesStrArr: [], paramsArr: [] };
  let keyValuesStr = "";
  const paramsArr = [] as any;
  const keysValuesEntries = Object.entries(queryParams);

  keysValuesEntries.forEach(([key, value], index) => {
    const diffKey = key.split("-");

    if (diffKey[1] === "diff") {
      keyValuesStr += value
        ? ` ${diffKey[0]}!=$${paramsArr.length + startIndex} `
        : "";
    } else
      keyValuesStr += value ? ` ${key}=$${paramsArr.length + startIndex} ` : "";
    if (index !== keysValuesEntries.length - 1)
      keyValuesStr += value ? ` and` : "";

    if (value) {
      if (key === "phone_number" || typeof value !== "number")
        paramsArr.push(value);
      else {
        paramsArr.push(Number(value));
      }
    }
  });
  // EXAM: keyValuesStrArr : profile_id=$1,
  return {
    keyValuesStrArr: keyValuesStr ? [keyValuesStr] : [],
    paramsArr,
  };
};

export const prepareStatementLogic = (
  querySelectLogic: string,
  queryParams: Record<string, any> = {},
  queryNameParams: Record<string, any> = {},
  comparisonQuery: { gt: string[]; lt: string[] }
) => {
  const { keyValuesStrArr, paramsArr } = prepareKeyValuesOtherColumnToSelect(
    queryParams,
    1
  );

  const { keyValuesOfNameStrArr, paramsNamesArr } =
    prepareKeyValuesOfNameToSelect(queryNameParams, paramsArr.length + 1);

  const queryParamsRes = [...paramsArr, ...paramsNamesArr];

  // To create string with 'and' between the queries string.
  const queryStrJoin = [...keyValuesStrArr, ...keyValuesOfNameStrArr].join(
    keyValuesStrArr.length > 0 ? " and " : ""
  );

  const comparisonStr = prepareComparisonParamsStatement(
    comparisonQuery,
    queryParamsRes
  );
  const comparisonStatementStr = comparisonStr ? `and ${comparisonStr}` : "";

  const whereQueryStatement = `${
    queryStrJoin ? `WHERE ${queryStrJoin} ${comparisonStatementStr}` : ""
  }`;

  const queryStrStatement = `${querySelectLogic} ${whereQueryStatement}`;

  return { queryStrStatement, queryParamsRes };
};

export const createSelectPaginationParams = (
  selectPaginationQueryParam: SelectPaginationQueryParam
) => {
  const {
    requestQuery,
    queryParams,
    queryNameParam,
    orderByParam,
    comparisonQuery,
  } = selectPaginationQueryParam;

  const {
    page,
    asc,
    numResults,
    timeLineDisplay,
    chartDisplay,
    orderBy, // The client send in the url query the name of field to order by.
    gt, // The client send in the url query the name of field that his value is greater than.
    lt, // The client send in the url query the name of field that his value is lesser than.
    ...rest
  } = requestQuery;

  const pageNumber = Number(page || 1);
  const ascDefault = (asc === undefined ? true : asc === "true") as boolean;
  const numResultDefault = Number(numResults || 8);
  const maxNumResult = numResultDefault > 100 ? 100 : numResultDefault;
  const comparisonQueryKeyValue = comparisonQuery
    ? {
        gt: [comparisonQuery.gt, gt as string],
        lt: [comparisonQuery.lt, lt as string],
      }
    : { gt: [], lt: [] };

  const orderByParamRes =
    orderByParam && orderBy ? orderByParam[orderBy as string] : "";

  const realQueryParams = prepareRealQueryKeyValuesObj(rest, queryParams);
  const realQueryByNameParams = prepareRealQueryKeyValuesObj(
    rest,
    queryNameParam
  );

  return {
    page: pageNumber,
    ascDefault,
    maxNumResult,
    realQueryParams,
    realQueryByNameParams,
    comparisonQueryKeyValue,
    orderByParamRes,
  };
};

export const spreadObj = (
  obj: Record<string, any>,
  values: string[],
  include?: string[]
) => {
  let includeKeyValueObj = {};
  let excludedKeyValueObj = {};
  for (const key in obj) {
    const valueToExclude = values?.includes(key);
    const valueToInclude = include?.includes(key);
    const keyValue = { [key]: obj[key] };
    if (valueToInclude && valueToExclude) {
      includeKeyValueObj = { ...includeKeyValueObj, ...keyValue };
      excludedKeyValueObj = { ...excludedKeyValueObj, ...keyValue };
    } else if (valueToExclude)
      includeKeyValueObj = { ...includeKeyValueObj, ...keyValue };
    else excludedKeyValueObj = { ...excludedKeyValueObj, ...keyValue };
  }

  return { includeKeyValueObj, excludedKeyValueObj };
};
