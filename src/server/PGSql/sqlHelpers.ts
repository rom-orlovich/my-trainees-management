/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

import { createObjKeysArr, createObjValuesArr } from "../utilities/helpers";

import { client } from "./DBConnectConfig";

// Makes string from the keys of the obj.
// This string is used as fieldName in update/insert functions.
const prepareFieldsName = (obj: Record<string, any>) => {
  const keys = createObjKeysArr(obj);
  return keys.reduce((pre, cur) => `${pre}${cur},`, "").slice(0, -1);
};

// Makes string from the value of the obj.
// This string is used as the values  in  insert functions.
const prepareValues = (obj: Record<string, any>, startParma = 1) => {
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
const prepareKeyValuesToUpdate = (obj: Record<string, any>, startIndex = 0) => {
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
export const createRealQueryKeyValuesObj = (
  queryFromReq: Record<string, any> | undefined,
  realQueryName: Record<string, string> | undefined
) => {
  if (!queryFromReq || !realQueryName) return {};
  if (!createObjKeysArr(queryFromReq)[0]) return {};

  let newRealQueryKeyValueObj = {} as Record<string, any>;
  for (const key in realQueryName) {
    // Created  key value obj which the first key is the key with the concat value of the query
    // and the other keys will concat to his key to create the concat name string for the query.
    newRealQueryKeyValueObj = {
      ...newRealQueryKeyValueObj,
      [realQueryName[key]]: queryFromReq[key],
    };
  }

  return newRealQueryKeyValueObj;
};

// Concat the obj query keys that belong to queryName.
const concatQueryWithName = (
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
  return { columnsNameStr, valueNameParam: [`%${keysValuesEntries[0][1]}%`] };
};

// Makes string from the key-value names of object.
// This string is used as the  key-values in 'where query' in select queries statement.
const prepareKeyValuesOfNameToSelect = (
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
// Makes string from the key-value of other columns of table.
// This string is used as the  key-values in 'where query' in select queries statement.
const prepareKeyValuesOtherColumnToSelect = (
  queryParams: Record<string, any>,
  startIndex = 0
) => {
  if (Object.keys(queryParams).length === 0)
    return { keyValuesStrArr: [], paramsArr: [] };
  let keyValuesStr = "";
  const paramsArr = [] as any;
  const keysValuesEntries = Object.entries(queryParams);

  keysValuesEntries.forEach(([key, value], index) => {
    keyValuesStr += `${key}=$${paramsArr.length + startIndex}`;
    if (index !== keysValuesEntries.length - 1)
      keyValuesStr += `${keyValuesStr} and`;
    paramsArr.push(value);
  });
  // EXAM: keyValuesStrArr : profile_id=$1,
  return {
    keyValuesStrArr: [`${keyValuesStr} `],
    paramsArr,
  };
};

// Select items from the db.
export async function selectQuery(
  tableName: string,
  fields = "*",
  queryLogic = "",
  queryParams = [] as any[]
) {
  const statement = `SELECT ${fields} FROM ${tableName} ${queryLogic} `;
  console.log(statement, queryParams);
  const rows = await client.query(statement, queryParams);

  return rows.rows;
}

// Insert item to the db.
const insertQuery = async (
  tableName: string,
  fieldName: string,
  fieldParams: string,
  paramArr = [] as any
) => {
  const statement = `INSERT INTO ${tableName} (${fieldName})
   VALUES ${fieldParams} RETURNING *`;
  console.log(statement, paramArr);
  const res = await client.query(statement, paramArr);

  return res;
};

// Update item in the db.
const updateQuery = async (
  tableName: string,
  keyValuesStr: string,
  queryLogic: string,
  paramId: string,
  paramsArr: any[]
) => {
  const statement = `UPDATE ${tableName} SET ${keyValuesStr}
  ${queryLogic} RETURNING *`;
  console.log(statement, [paramId, ...paramsArr]);
  const rows = await client.query(statement, [paramId, ...paramsArr]);
  return rows;
};

// Prepares the string from the item that should insert to the db.
// And insert him in the db.
export async function insertQueryOneItem(
  tableName: string,
  obj: Record<string, any>
) {
  const fieldName = prepareFieldsName(obj);
  const { fieldParams, paramsArr } = prepareValues(obj);
  const res = await insertQuery(tableName, fieldName, fieldParams, paramsArr);

  return res.rows[0];
}

// Prepares the string from item that should update by their id.
// And update the item.
export async function updateQuerySingleItem(
  tableName: string,
  obj: Record<string, any>,
  paramId: string,
  queryLogic = ""
) {
  const { paramsArr, keyValuesStr } = prepareKeyValuesToUpdate(obj, 2);

  const rows = await updateQuery(
    tableName,
    keyValuesStr,
    queryLogic,
    paramId,
    paramsArr
  );

  return rows.rows[0];
}

// Deletes one item from the db.

export async function deleteQuery(
  tableName: string,
  queryLogic: string,
  queryParams: any[],
  returnValue = false
) {
  const statement = `DELETE FROM ${tableName} ${queryLogic} ${
    returnValue ? "RETURNING *" : ""
  }`;
  console.log(statement, queryParams);
  const rows = await client.query(statement, queryParams);
  return rows.rows;
}

// Make pagination by select query.
// Return the items array and boolean value if there is next
// page.
export async function selectPagination(
  idField: string,
  tableName: string,
  page = "1",
  fields = "*",
  querySelectLogic = "",
  queryParams: Record<string, any> = {},
  queryNameParams: Record<string, any> = {},
  ascending = true,
  numResult = 10
) {
  const numPage = Number(page) - 1;
  const offset = numPage * numResult;
  const numResultsReach = offset + numResult;

  // Prepares the select query of the pagination and the values of where query.
  const { keyValuesStrArr, paramsArr } = prepareKeyValuesOtherColumnToSelect(
    queryParams,
    1
  );
  const { keyValuesOfNameStrArr, paramsNamesArr } =
    prepareKeyValuesOfNameToSelect(queryNameParams, paramsArr.length + 1);

  const queryParamsRes = [...paramsArr, ...paramsNamesArr];

  // To create string with 'and' between the queries string.
  const queryStrJoin = [...keyValuesStrArr, ...keyValuesOfNameStrArr].join(
    " and "
  );

  const queryStrResult = `${querySelectLogic} ${
    queryStrJoin ? `WHERE ${queryStrJoin}` : ""
  } `;

  // Check the number of items that are in the table .
  const countRows = await selectQuery(
    tableName,
    "count(*)",
    queryStrResult,
    queryParamsRes
  );
  const numTotalRows = Number(countRows[0].count);

  // Return if the table is empty.
  if (!numTotalRows) return { rows: [], next: false, countRows: 0 };

  const limitOffsetQuery = `order by ${idField} ${
    ascending ? "ASC" : "DESC"
  } LIMIT $${queryParamsRes.length + 1} OFFSET $${queryParamsRes.length + 2}`;

  const rows = await selectQuery(
    tableName,
    fields,
    `${queryStrResult} ${limitOffsetQuery}`,
    [...queryParamsRes, numResult, offset]
  );

  return {
    rows,
    next: numResultsReach < numTotalRows,
    countRows: numTotalRows,
  };
}
