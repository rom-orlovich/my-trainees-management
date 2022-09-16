/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

import {
  InsertOtherTable,
  SelectOtherTable,
  SelectTableQueryParam,
} from "../routes/routesConfig";
import {
  createObjKeysArr,
  createObjValuesArr,
  promiseHandler,
} from "../utilities/helpers";

import { client } from "./DBConnectConfig";

// Check if the table name is exist.
export async function checkIfTableExist(nameTable: string) {
  const statement = `SELECT EXISTS (SELECT 1
    FROM information_schema.tables
    WHERE table_name = $1)`;
  const [res, err] = await promiseHandler(client.query(statement, [nameTable]));
  if (res?.rows[0].exists) return true;
  return false;
}

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

// Makes string from the values object array.
// This string is used as the values in insert functions.
const prepareValuesArr = (objArr: Record<string, any>[], startIndex = 1) => {
  let fieldParamsStrAll = "";
  const paramsArrAll = [] as any;
  let lastIndexArr = startIndex;
  objArr.forEach((obj) => {
    const { fieldParams, paramsArr, lastIndex } = prepareValues(
      obj,
      lastIndexArr
    );
    paramsArrAll.push(...paramsArr);
    fieldParamsStrAll += `${fieldParams},`;
    lastIndexArr += lastIndex;
  });
  fieldParamsStrAll = fieldParamsStrAll.slice(0, -1);
  return { paramsArrAll, fieldParamsStrAll, lastIndexArr };
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
//  from the real queries names a new obj which contains the table column name and his value
// for the select query.
export const createRealQueryKeyValuesObj = (
  queryFromReq: Record<string, any> | undefined,
  realQueryName: Record<string, string> | undefined
) => {
  if (!queryFromReq || !realQueryName) return {};
  if (!createObjKeysArr(queryFromReq)[0]) return {};

  let newRealQueryKeyValueObj = {} as Record<string, any>;
  for (const key in realQueryName) {
    newRealQueryKeyValueObj = {
      ...newRealQueryKeyValueObj,
      [realQueryName[key]]: queryFromReq[key],
    };
  }

  return newRealQueryKeyValueObj;
};

// Concat the obj query keys that contains 'name'.
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
    ",' ',"
  )}) ILIKE $${startIndex} `;
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
  const keyValuesStr = "";
  const paramsArr = [] as any;
  const keysValuesEntries = Object.entries(queryNameParams);

  const { columnsNameStr, valueNameParam } = concatQueryWithName(
    keysValuesEntries,
    startIndex
  );
  paramsArr.push(...valueNameParam);

  return {
    keyValuesOfNameStrArr: [`${columnsNameStr}`],
    paramsNamesArr: paramsArr,
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

  return {
    keyValuesStrArr: [`${keyValuesStr} `],
    paramsArr,
  };
};

// Extracts the keysPossible from the obj or the objkeys from the keyPossible
// and get new obj from the keys and values that extract.
const destructureObjByKeys = (
  keysPossible: string[],
  obj: Record<string, any>,
  extractKeysFromObj = false // In false mode there will be new obj from the keys.
) => {
  const entries = Object.entries(obj);
  let newObj = {} as Record<string, any>;
  entries.forEach(([key, value]) => {
    if (!extractKeysFromObj) {
      if (keysPossible.includes(key)) newObj = { ...newObj, [key]: value };
    } else if (!keysPossible.includes(key))
      newObj = { ...newObj, [key]: value };
  });

  return newObj;
};

// Create new Arr from the of table name and new extract obj.
const createDestructureArr = (
  insertDataToOtherTables: InsertOtherTable[],
  obj: Record<string, any>
) =>
  insertDataToOtherTables.map((el) => ({
    tableName: el.tableName,
    id: el.id,
    obj: destructureObjByKeys(el.keysPossible, obj),
  }));

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

const separatedSubTableNameAndKeys = (
  tableSelectQuery: SelectTableQueryParam
) => {
  const { subTableKeys } = tableSelectQuery;
  // The obj that contain the name of the sub table and the
  // list of it keys.
  if (!subTableKeys) return { subTableName: "", keys: [] };

  // Get the subTableName.
  const subTableName = createObjKeysArr(subTableKeys)[0];
  // Get the it Keys.
  const keys = subTableKeys[subTableName];

  return { keys, subTableName };
};

const createMainTableAndSubTableArr = (
  selectTableQuery: SelectTableQueryParam,
  tablesDataList: Record<string, any>[]
) => {
  const { keys, subTableName } = separatedSubTableNameAndKeys(selectTableQuery);

  const mainTableArr: Record<string, any>[] = [];
  const cachedId: string[] = [];
  tablesDataList.forEach((el) => {
    const formattedTableID = selectTableQuery.tableID
      .split(".")
      .slice(1)
      .join("");
    const tableID = el[formattedTableID];
    const subTableData = subTableName
      ? {
          [subTableName]: tablesDataList
            .filter((table) => table[formattedTableID] === tableID)
            .map((filterTable) => destructureObjByKeys(keys, filterTable)),
        }
      : {};

    if (!cachedId.includes(tableID)) {
      cachedId.push(tableID);
      mainTableArr.push({
        ...destructureObjByKeys(keys, el, true),
        ...subTableData,
      });
    }
  });
  return mainTableArr;
};

export const createObjMainTable = (
  selectTableQuery: SelectTableQueryParam,
  tablesDataList: Record<string, any>[] | undefined
) => {
  const mainTableName = selectTableQuery.tableName;

  // Format the name of the main table
  const mainTableNameFormatted = mainTableName.split(" ").slice(0, 1).join();

  // Check that the data table list is not empty and defined
  if (!tablesDataList || tablesDataList.length === 0)
    return {
      [mainTableNameFormatted]: [],
    };
  // Map over the results of the select query array and destructure
  // the data of the sub table into main table data.
  return {
    [mainTableNameFormatted]: createMainTableAndSubTableArr(
      selectTableQuery,
      tablesDataList
    ),
  };
};

// Creates array of promises that contains all the data of destrcture
// main and sub table.
const makeSelectQueryArr = async (
  mainTableQuery: Record<string, any>,
  selectTableQuery: SelectOtherTable
) => {
  const map = selectTableQuery.selectQueriesParams.map(
    async (
      {
        tableID,
        tableName,
        fieldNamesQuery,
        querySelectLogic,
        subTableID,
        idSearch,
      },
      i
    ) => {
      const queryLogicByTableId = `WHERE ${idSearch || tableID} = $1`;

      // Select query for each table in the array.
      console.log(mainTableQuery, subTableID);
      const selectQueryRes = await selectQuery(
        tableName,
        fieldNamesQuery,
        `${querySelectLogic} ${queryLogicByTableId}`,
        // Get the id from the main table and use it in order
        // to find the relation data to the main table.
        [mainTableQuery[subTableID || ""]]
      );

      // The normalize data of the table and sub table.
      const normalizeTableAndSubTableData = createObjMainTable(
        selectTableQuery.selectQueriesParams[i],
        selectQueryRes as Record<string, any>[]
      );
      return normalizeTableAndSubTableData;
    }
  );

  return Promise.all(map);
};

// Select items from many table the db.
export async function selectFromManyTablesQuery(
  selectTableQuery: SelectOtherTable,
  tableName: string,
  fields = "*",
  queryLogic = "",
  queryParams = [] as any[]
) {
  // Get the data of the main table which we get the relevant data
  // to other table.
  const [mainTableRes] = await selectQuery(
    tableName,
    fields,
    queryLogic,
    queryParams
  );

  if (!mainTableRes) throw Error("The query not found");
  // Get the data of main tables and their sub table array
  const selectQueriesArr = await makeSelectQueryArr(
    mainTableRes,
    selectTableQuery
  );

  let obj = {};

  selectQueriesArr.forEach((el) => {
    obj = { ...obj, ...el };
  });
  const mainTableNameFormatted = tableName.split(" ").slice(0, 1).join();
  return { [mainTableNameFormatted]: mainTableRes, ...obj };
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

// Preppres the string from  items array that should insert to the db.
// And insert them in the db.
export async function insertManyQuery(
  tableName: string,
  objArr: Record<string, any>[],
  startIndex = 1
) {
  const fieldName = prepareFieldsName(objArr[0]);
  const { fieldParamsStrAll, paramsArrAll } = prepareValuesArr(
    objArr,
    startIndex
  );
  const res = await insertQuery(
    tableName,
    fieldName,
    fieldParamsStrAll,
    paramsArrAll
  );

  return res.rows;
}

// Insert new complex data to many tables by destructure it to different obj
// in foramt that fit the other tables's schemas.
export async function insertQueryToManyTables(
  tableName: string,
  insertDataToOtherTables: InsertOtherTable[] | undefined,
  obj: Record<string, any>
) {
  if (!insertDataToOtherTables || insertDataToOtherTables.length === 0)
    throw Error("The endpoint is not supported by this data format.");

  const destrctureMap = createDestructureArr(insertDataToOtherTables, obj);

  let mainTableObj = destructureObjByKeys(
    insertDataToOtherTables[0].keysPossible,
    obj,
    true
  );

  // Add the data of other table to the db.
  const queryOtherTable = await Promise.all(
    destrctureMap.map((el) => insertQueryOneItem(el.tableName, el.obj))
  );

  // Attach the new ids of the data that was insert to the tables in db,
  // to the mainTableObj.
  queryOtherTable.forEach((el) => {
    const keyValue = Object.entries(el)[0];
    mainTableObj = { ...mainTableObj, [keyValue[0]]: keyValue[1] };
  });

  // Insert the mainTableObj to the db.
  const dataCurrentTable = await insertQueryOneItem(tableName, mainTableObj);

  return dataCurrentTable;
}

// Preppres the string from item that should update by their id.
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

// Update data  by destructure new complex data to different obj
// in format that fit the other tables's schemas.
export async function updateQueryToManyTables(
  tableName: string,
  insertDataToOtherTables: InsertOtherTable[] | undefined,
  obj: Record<string, any>,
  paramId: string,
  queryLogic = ""
) {
  if (!insertDataToOtherTables || insertDataToOtherTables.length === 0)
    throw Error("The endpoint is not supported by this data format.");

  let mainTableObj = destructureObjByKeys(
    insertDataToOtherTables[0].keysPossible,
    obj,
    true
  );
  const destrctureMap = createDestructureArr(insertDataToOtherTables, obj);
  // Add the data of other table to the db.
  const queryOtherTables = await Promise.all(
    destrctureMap.map((el) => {
      const qureyLogicEl = `where ${el.id}=$1`;
      return updateQuerySingleItem(
        el.tableName,
        el.obj,
        obj[el.id],
        qureyLogicEl
      );
    })
  );

  // Attach the new ids of the data that was insert to the tables in db,
  // to the mainTableObj.
  queryOtherTables.forEach((el) => {
    const keyValue = Object.entries(el)[0];

    mainTableObj = { ...mainTableObj, [keyValue[0]]: keyValue[1] };
  });

  // Insert the mainTableObj to the db.
  const dataCurrentTable = await updateQuerySingleItem(
    tableName,
    mainTableObj,
    paramId,
    queryLogic
  );

  return dataCurrentTable;
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
  return rows.rows[0];
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
  numResult = 10
) {
  const numPage = Number(page) - 1;
  const offset = numPage * numResult;
  const numResultsReach = offset + numResult;

  // Prepres the select query of the pagination and the values of where query.
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
  if (!numTotalRows) return { rows: [], next: false };

  const limitOffsetQuery = `order by ${idField} LIMIT $${
    queryParamsRes.length + 1
  } OFFSET $${queryParamsRes.length + 2}`;

  const rows = await selectQuery(
    tableName,
    fields,
    `${queryStrResult} ${limitOffsetQuery}`,
    [...queryParamsRes, numResult, offset]
  );

  return { rows, next: numResultsReach < numTotalRows };
}
