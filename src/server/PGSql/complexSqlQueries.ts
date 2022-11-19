/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable default-param-last */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

import {
  SelectPaginationQueryParam,
  TablePropsData,
} from "../services/serviceCRUD/serviceCRUDTypes";

import { client } from "./DBConnectConfig";
import {
  createSelectPaginationParams,
  prepareStatementLogic,
  spreadObj,
} from "./queriesHelpers";
import {
  deleteQuery,
  insertQueryOneItem,
  selectQuery,
  updateQuerySingleItem,
} from "./simpleSqlQueries";

// Make pagination by select query.
// Return the items array and boolean value if there is next page.
export async function selectPagination(
  tablePropsData: TablePropsData,
  selectPaginationQueryParam: SelectPaginationQueryParam
) {
  const { fieldNamesQuery, groupBy, querySelectLogic, tableName, tableID } =
    tablePropsData;

  const {
    page,
    realQueryParams,
    realQueryByNameParams,
    orderByParamRes,
    ascDefault,
    comparisonQueryKeyValue,
    maxNumResult,
  } = createSelectPaginationParams(selectPaginationQueryParam);

  const numPage = page - 1;
  const offset = numPage * maxNumResult;
  const numResultsReach = offset + maxNumResult;

  const { queryParamsRes, queryStrStatement } = prepareStatementLogic(
    querySelectLogic,
    realQueryParams,
    realQueryByNameParams,
    comparisonQueryKeyValue
  );

  // Check the number of items that are in the table .
  const countRows = await selectQuery(
    tableName,
    "count(*)",
    queryStrStatement,
    queryParamsRes
  );
  const numTotalRows = Number(countRows[0].count);

  // Return if the table is empty.
  if (!numTotalRows) return { rows: [], next: false, countRows: 0 };

  // Select query addons statements
  const orderByStatement = `ORDER BY ${orderByParamRes || tableID}`;
  const groupByStatement = groupBy ? `GROUP BY ${groupBy}` : "";
  const isAscOrder = ascDefault ? "ASC" : "DESC";
  const limitOffsetStatement = `LIMIT $${queryParamsRes.length + 1} OFFSET $${
    queryParamsRes.length + 2
  } `;
  const queryStatementAddons = `${orderByStatement} ${groupByStatement} ${isAscOrder} ${limitOffsetStatement}`;

  const rows = await selectQuery(
    tableName,
    fieldNamesQuery,
    `${queryStrStatement} ${queryStatementAddons}`,
    [...queryParamsRes, maxNumResult, offset]
  );

  return {
    rows,
    next: numResultsReach < numTotalRows,
    countRows: numTotalRows,
  };
}

export const insertNewTableData = async (
  mainTableName: string,
  reqBody: Record<string, any>,
  modifiedOtherTable?: {
    otherTableName: string;
    values: string[];
    otherTableID: string;
  }
) => {
  let data;

  // If modifiedOtherTable is not exist so it will insert the data regularly .
  if (modifiedOtherTable) {
    // Begin transaction
    await client.query("BEGIN");
    const { otherTableName, values, otherTableID } = modifiedOtherTable;
    // Spread the data that relate to the main table and the data that relate to the sec table.
    const { excludedKeyValueObj, includeKeyValueObj } = spreadObj(
      reqBody,
      values
    );
    // Create new item in sec table that relate to the main table.
    const otherTableData = await insertQueryOneItem(
      otherTableName,
      includeKeyValueObj
    );

    // Create new item in main table and attach the new id  from the sec table.
    const mainTableData = await insertQueryOneItem(mainTableName, {
      ...excludedKeyValueObj,
      [otherTableID]: otherTableData[otherTableID],
    });
    data = { ...mainTableData, ...otherTableData };
    // End transaction
    await client.query("COMMIT");
  } else {
    data = await insertQueryOneItem(mainTableName, reqBody);
  }
  return data;
};

export const updateExistTableData = async (
  mainTableName: string,
  mainTableID: string,
  reqBody: Record<string, any>,
  paramID: string,
  modifiedOtherTable?: {
    otherTableName: string;
    values: string[];
    otherTableID: string;
    include?: string[];
  }
) => {
  let data;
  const mainTableQueryLogic = `WHERE ${mainTableID}=$1`;
  if (modifiedOtherTable) {
    // Begin transaction
    await client.query("BEGIN");

    const { otherTableName, values, otherTableID, include } =
      modifiedOtherTable;

    // Spread the data that relate to the main table and the data that relate to the sec table.
    const { excludedKeyValueObj, includeKeyValueObj } = spreadObj(
      reqBody,
      values,
      include
    );

    // Update the main table and get the id of the other table.
    const mainTableData = await updateQuerySingleItem(
      mainTableName,
      {
        ...excludedKeyValueObj,
      },
      paramID,
      mainTableQueryLogic
    );
    const secTableQueryLogic = `WHERE ${otherTableID}=$1`;

    // Update the sec table.
    const otherTableData = await updateQuerySingleItem(
      otherTableName,
      includeKeyValueObj,
      mainTableData[otherTableID],
      secTableQueryLogic
    );

    data = { ...mainTableData, ...otherTableData };
    // End transaction
    await client.query("COMMIT");
  } else {
    data = await updateQuerySingleItem(
      mainTableName,
      reqBody,
      paramID,
      mainTableQueryLogic
    );
  }
  return data;
};

export const deleteTableWithOtherTableData = async (
  mainTableName: string,
  mainTableID: string,
  paramID: string,
  modifiedOtherTable?: {
    otherTableName: string;
    otherTableID: string;
  }
) => {
  let mainTableData;
  const mainTableQueryLogic = `WHERE ${mainTableID}=$1`;
  if (modifiedOtherTable) {
    const { otherTableID, otherTableName } = modifiedOtherTable;
    await client.query("BEGIN");

    mainTableData = await deleteQuery(
      mainTableName,
      mainTableQueryLogic,
      [paramID],
      true
    );

    const secTableQueryLogic = `WHERE ${otherTableID}=$1`;
    const otherTableData = await deleteQuery(
      otherTableName,
      secTableQueryLogic,
      [mainTableData[0][otherTableID]],
      true
    );

    await client.query("COMMIT");
  } else
    mainTableData = await deleteQuery(
      mainTableName,
      mainTableQueryLogic,
      [paramID],
      true
    );
  return mainTableData;
};
