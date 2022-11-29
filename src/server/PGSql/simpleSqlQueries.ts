import { logger } from "../services/loggerService/logger";
import { client } from "./DBConnectConfig";
import {
  prepareFieldsName,
  prepareKeyValuesToUpdate,
  prepareValuesToInsert,
} from "./queriesHelpers";
// Select items from the db.
export async function selectQuery(
  tableName: string,
  fields = "*",
  queryLogic = "",
  queryParams = [] as any[],
  wholeSelectQueryLogic = ""
) {
  const statement = `${
    wholeSelectQueryLogic || `SELECT ${fields} FROM ${tableName}`
  } ${queryLogic} `;

  try {
    const rows = await client.query(statement, queryParams);
    logger.debug(
      `LINE 232:${statement} : values:${JSON.stringify(queryParams)}`,
      {
        __filename,
      }
    );
    return rows.rows;
  } catch (error) {
    logger.error(
      `LINE 248:${statement} : values:${JSON.stringify(queryParams)}`,
      {
        objs: [error],
        __filename,
      }
    );
    throw error;
  }
}

export const insertMany = async <T>(tableName: string, arr: T[]) => {
  const statement = `INSERT INTO ${tableName} select * from json_populate_recordset(null::${tableName},$1) RETURNING * `;

  const paramsArr = [JSON.stringify(arr)];
  console.log(paramsArr);
  try {
    const res = await client.query(statement, paramsArr);
    return res;
  } catch (error) {
    logger.error(`LINE 48:${statement} : values:${JSON.stringify(paramsArr)}`, {
      objs: [error],
      __filename,
    });
    throw error;
  }
};

// Insert item to the db.
export const insertQuery = async (
  tableName: string,
  fieldName: string,
  fieldParams: string,
  paramsArr: any[],
  onConflict?: string
) => {
  const statement = `INSERT INTO ${tableName} (${fieldName})
     VALUES ${fieldParams} ${onConflict ? `${onConflict}` : ""} RETURNING * `;

  try {
    const res = await client.query(statement, paramsArr);
    return res;
  } catch (error) {
    logger.error(`LINE 74:${statement} : values:${JSON.stringify(paramsArr)}`, {
      objs: [error],
      __filename,
    });
    throw error;
  }
};

// Update item in the db.
const updateQuery = async (
  tableName: string,
  keyValuesStr: string,
  queryLogic: string,
  paramId: string,
  paramsArr: any[]
) => {
  const params = [paramId, ...paramsArr];
  const statement = `UPDATE ${tableName} SET ${keyValuesStr}
    ${queryLogic} RETURNING *`;

  try {
    const rows = await client.query(statement, params);
    logger.debug(`line 265:${statement} : values:${JSON.stringify(params)}`, {
      __filename,
    });
    return rows;
  } catch (error) {
    logger.error(`LINE 309:${statement} : values:${JSON.stringify(params)}`, {
      objs: [error],
      __filename,
    });
    throw error;
  }
};

// Prepares the string from the item that should insert to the db.
// And insert him in the db.
export async function insertQueryOneItem(
  tableName: string,
  obj: Record<string, any>,
  onConflict?: string
) {
  const fieldName = prepareFieldsName(obj);
  const { fieldParams, paramsArr } = prepareValuesToInsert(obj);

  const res = await insertQuery(
    tableName,
    fieldName,
    fieldParams,
    paramsArr,
    onConflict
  );

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

  const res = await updateQuery(
    tableName,
    keyValuesStr,
    queryLogic,
    paramId,
    paramsArr
  );

  return res.rows[0];
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
  } `;

  try {
    const rows = await client.query(statement, queryParams);
    // logger.debug(
    //   `LINE 375:${statement} : values:${JSON.stringify(queryParams)}`,
    //   {
    //     __filename,
    //   }
    // );
    return rows.rows;
  } catch (error) {
    logger.error(
      `LINE 375:${statement} : values:${JSON.stringify(queryParams)}`,
      {
        objs: [error],
        __filename,
      }
    );
    throw error;
  }
}
