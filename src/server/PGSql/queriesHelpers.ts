/* eslint-disable default-param-last */
/* eslint-disable guard-for-in */
// Makes string from the keys of the obj.

import {
  ArrayQueryParams,
  SelectPaginationQueryParam,
} from "../services/CRUDService/CRUDServiceTypes";
import {
  createObjEntries,
  createObjKeysArr,
  createObjValuesArr,
} from "../utilities/helpers";
import { GenericRecord } from "../utilities/types";
import {
  ArrayQueryParamsPrepareStatementObj,
  ComparisonQueryKeyValueObj,
} from "./queryHelpersTypes";

export const spreadObj = (
  obj: GenericRecord<any>,
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

// This string is used as fieldName in update/insert functions.
export const prepareFieldsName = (obj: GenericRecord<any>) => {
  const keys = createObjKeysArr(obj);
  return keys.reduce((pre, cur) => `${pre}${cur},`, "").slice(0, -1);
};

// Makes string from the value of the obj.
// This string is used as the values in insert functions.
export const prepareValuesToInsert = (
  obj: GenericRecord<any>,
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
  obj: GenericRecord<any>,
  startIndex = 0
) => {
  let keyValuesStr = "";
  const paramsArr = [] as any;
  const keysValuesEntries = createObjEntries(obj);
  keysValuesEntries.forEach(([key, value], index) => {
    keyValuesStr += `${key}=$${index + startIndex},`;
    paramsArr.push(value);
  });

  return { keyValuesStr: ` ${keyValuesStr.slice(0, -1)}`, paramsArr };
};

const prepareArrayQueryParamsStatement = (
  requestQuery: GenericRecord<string>,
  arrayQueryParams?: GenericRecord<ArrayQueryParams>
) => {
  const initialQueryParamsPrepareStatementObj = {
    paramsArrayArr: [],
    selectQueryStatements: [],
  } as ArrayQueryParamsPrepareStatementObj;
  if (!arrayQueryParams) return initialQueryParamsPrepareStatementObj;
  const arrayQueryParamsEntries = createObjEntries(arrayQueryParams);

  const arrayQueryParamsArr = arrayQueryParamsEntries.reduce(
    (pre, [key, value]) => {
      const queryKey = requestQuery[key];
      if (queryKey) {
        pre.paramsArrayArr.push(queryKey.split(","));
        pre.selectQueryStatements.push(value.selectQueryStr);
      }
      return pre;
    },
    initialQueryParamsPrepareStatementObj
  );

  return arrayQueryParamsArr;
};

const prepareComparisonQueryKeyValue = (
  requestQuery: GenericRecord<any>,
  comparisonQuery?: GenericRecord<string>
) => {
  const comparisonQueryKeyValue: ComparisonQueryKeyValueObj = {
    gt: [],
    lt: [],
  };
  if (!comparisonQuery) return comparisonQueryKeyValue;
  // Create entries comparisonQuery array
  const comparisonQueryEntries = createObjEntries(comparisonQuery);

  comparisonQueryEntries.forEach(([key, realFieldName]) => {
    const compareQueryValue = requestQuery[key] as string;
    // Check if the fake field name is exist in the request query params
    if (compareQueryValue) {
      // split the key into the operator
      let operator;
      if (key === "gt" || key === "lt") operator = key as "lt" | "gt";
      else {
        const splitKey = key.split("_");
        operator = splitKey[splitKey.length - 1] as "lt" | "gt";
      }

      // Push into entries comparisonQueryKeyValue object
      if (operator && comparisonQueryKeyValue[operator])
        comparisonQueryKeyValue[operator].push({
          realFieldName,
          valueToCompare: compareQueryValue,
        });
    }
  });
  return comparisonQueryKeyValue;
};

// Create from the query params of the request and
//  from the real queries names a new obj which contains the table column name
// and his value for the select query.
export const prepareRealQueryKeyValuesObj = (
  queryFromReq?: GenericRecord<any>,
  fakeQueryName?: GenericRecord<string>
) => {
  if (!queryFromReq || !fakeQueryName) return {};
  if (!createObjKeysArr(queryFromReq)[0]) return {};

  let newRealQueryKeyValueObj = {} as GenericRecord<any>;
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
  queryNameParams: GenericRecord<any>,
  startIndex = 0
) => {
  if (Object.keys(queryNameParams).length === 0)
    return { keyValuesOfNameStrArr: [], paramsNamesArr: [] };

  const keysValuesEntries = createObjEntries(queryNameParams);

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
  comparisonQuery: ComparisonQueryKeyValueObj,
  startIndex = 0
) => {
  const comparisonParams: string[] = [];
  // Loop over the gt and lt realFieldNameAndValue array and create array of compare string as a compare format of PostgreSql.
  const createOperatorStringArr = (
    operator: "gt" | "lt",
    operatorSymbol: ">=" | "<=",
    loopStartIndex = 0
  ) => {
    const strArr: string[] = [];
    comparisonQuery[operator].forEach(
      ({ realFieldName, valueToCompare }, i) => {
        // 'real name field' >= value or 'real name field' <= value
        strArr.push(
          `${realFieldName} ${operatorSymbol} $${loopStartIndex + i}`
        );
        comparisonParams.push(valueToCompare);
      }
    );
    return strArr;
  };

  const comparisonGreaterStr = createOperatorStringArr("gt", ">=", startIndex);

  const comparisonLesserStr = createOperatorStringArr(
    "lt",
    "<=",
    comparisonGreaterStr.length + startIndex
  );

  const comparisonStatementStatement = [
    ...comparisonGreaterStr,
    ...comparisonLesserStr,
  ];

  return { comparisonStatementStatement, comparisonParams };
};

// Makes string from the key-value of other columns of table.
// This string is used as the  key-values in 'where query' in select queries statement.
export const prepareKeyValuesOtherColumnToSelect = (
  queryParams: GenericRecord<any>,
  startIndex = 0
) => {
  if (createObjKeysArr(queryParams).length === 0)
    return { keyValuesStatement: [], paramsArr: [] };

  const paramsArrStr: string[] = [];
  const paramsArr: any[] = [];
  const keysValuesEntries = createObjEntries(queryParams);

  keysValuesEntries.forEach(([key, value]) => {
    const diffKey = key.split("-");

    if (value) {
      if (diffKey[1] === "diff")
        paramsArrStr.push(` ${diffKey[0]}!=$${paramsArr.length + startIndex} `);
      else paramsArrStr.push(` ${key}=$${paramsArr.length + startIndex} `);

      // If the type of value is not number or key is phone number insert as his type value.
      // Else insert as number type.
      if (key === "phone_number" || typeof value !== "number")
        paramsArr.push(value);
      else {
        paramsArr.push(Number(value));
      }
    }
  });
  // EXAM: keyValuesStatement : profile_id=$1,
  return {
    keyValuesStatement: paramsArrStr,
    paramsArr,
  };
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
    arrayQueryParams,
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
  const arrayQueryParamsObjStatement = prepareArrayQueryParamsStatement(
    requestQuery,
    arrayQueryParams
  );
  const pageNumber = Number(page || 1);
  const ascDefault = (asc === undefined ? true : asc === "true") as boolean;
  const numResultDefault = Number(numResults || 8);
  const maxNumResult = numResultDefault > 100 ? 100 : numResultDefault;

  const comparisonQueryKeyValue = prepareComparisonQueryKeyValue(
    requestQuery,
    comparisonQuery
  );

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
    arrayQueryParamsObjStatement,
  };
};

const prepareKeyValuesArrayQueryParamsToStatement = (
  arrayQueryParams: ArrayQueryParamsPrepareStatementObj,
  startIndex = 0
) => {
  const arrayQueryParamsStatement = arrayQueryParams.selectQueryStatements.map(
    (statement, i) => `${statement} ($${startIndex + i})`
  );
  return {
    arrayQueryParamsStatement,
    arrayQueryParamsArr: arrayQueryParams.paramsArrayArr, // like [[]]
  };
};

export const prepareStatementLogic = (
  querySelectLogic: string,
  queryParams: GenericRecord<any> = {},
  queryNameParams: GenericRecord<any> = {},
  comparisonQuery: ComparisonQueryKeyValueObj,
  arrayQueryParams: ArrayQueryParamsPrepareStatementObj
) => {
  const queryParamsRes: any[] = [];
  const { keyValuesStatement, paramsArr } = prepareKeyValuesOtherColumnToSelect(
    queryParams,
    queryParamsRes?.length + 1
  );
  queryParamsRes.push(...paramsArr);

  const { keyValuesOfNameStrArr, paramsNamesArr } =
    prepareKeyValuesOfNameToSelect(queryNameParams, queryParamsRes.length + 1);

  queryParamsRes.push(...paramsNamesArr);

  const { comparisonStatementStatement, comparisonParams } =
    prepareComparisonParamsStatement(
      comparisonQuery,
      queryParamsRes.length + 1
    );
  queryParamsRes.push(...comparisonParams);

  const { arrayQueryParamsStatement, arrayQueryParamsArr } =
    prepareKeyValuesArrayQueryParamsToStatement(
      arrayQueryParams,
      queryParamsRes.length + 1
    );

  queryParamsRes.push(...arrayQueryParamsArr);

  // To create string with 'and' between the queries string.
  const queryStrBeforeJoin = [
    ...keyValuesStatement,
    ...keyValuesOfNameStrArr,
    ...comparisonStatementStatement,
    ...arrayQueryParamsStatement,
  ];

  const queryParamsStrStatement = queryStrBeforeJoin.join(
    queryStrBeforeJoin.length > 1 ? " and " : ""
  );
  const whereQueryStatement = `${
    queryParamsStrStatement ? `WHERE  ${queryParamsStrStatement} ` : ""
  }`;

  const queryStrStatement = `${querySelectLogic} ${whereQueryStatement}`;

  return { queryStrStatement, queryParamsRes };
};
