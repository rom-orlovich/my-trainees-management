/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import * as yup from "yup";
import {
  createRealQueryKeyValuesObj,
  deleteQuery,
  insertManyQuery,
  insertQueryOneItem,
  insertQueryToManyTables,
  selectFromManyTablesQuery,
  selectPagination,
  selectQuery,
  updateQuerySingleItem,
  updateQueryToManyTables,
} from "../PGSql/sqlHelpers";
import { OptionsCRUD } from "../routes/routesConfig";
import { createObjValuesArr, promiseHandler } from "../utilities/helpers";
import { handleError } from "./handleErrors";

/**
 *
 * @param param0 Options of the CRUD controller routes.
 * @returns Object that contains all the  functions of CRUD conrollers.
 */
export function createRoutesControllers({
  singleEntityName,
  selectQuery: {
    tableName,
    tableID,
    fieldNamesQuery,
    querySelectLogic,
    queryParams,
    queryNameParam,
  },
  insertDataToOtherTables,
  validateSchema,
  selectOtherTablesQueries,
}: OptionsCRUD) {
  // Controller of the get method. Gets data from the db.
  const getValuesFromDB: RequestHandler = async (req, res) => {
    const { page, ...rest } = req.query;

    const [data, err] = await promiseHandler(
      selectPagination(
        tableID,
        `${tableName}`,
        page as string,
        fieldNamesQuery,
        querySelectLogic,
        createRealQueryKeyValuesObj(rest, queryParams),
        createRealQueryKeyValuesObj(rest, queryNameParam)
      )
    );

    console.log(err);
    if (err) return res.status(400).json({ message: "The query not found" });
    return res.status(200).json({ data: data.rows, next: data.next });
  };

  // Controller of the get method. Gets one item by ID from the db.
  const getValueFromDBbyID: RequestHandler = async (req, res) => {
    const queryLogic = `${querySelectLogic}  WHERE ${tableID}=$1`;
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Source Not Found" });
    }
    const [data, err] = await promiseHandler(
      selectQuery(`${tableName}`, `${fieldNamesQuery}`, queryLogic, [id])
    );
    console.log(err);
    if (err) return res.status(400).json({ message: "The query not found" });
    return res.status(200).json(data[0]);
  };

  const getExtendsDataByID: RequestHandler = async (req, res) => {
    const queryLogic = `${querySelectLogic}  WHERE ${tableID}=$1`;

    if (!selectOtherTablesQueries)
      return res.status(400).json({ message: "Something went wrong.." });
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Source Not Found" });
    }
    const [data, err] = await promiseHandler(
      selectFromManyTablesQuery(
        selectOtherTablesQueries,
        tableName,
        fieldNamesQuery,
        queryLogic,
        [id]
      )
    );
    console.log(err);
    if (err) return res.status(400).json({ message: "The query not found" });
    return res.status(200).json(data);
  };

  // Controller of the post method. Create one item  in the db.
  const createNewValueInDB: RequestHandler = async (req, res) => {
    const [vaild, errVaild] = await promiseHandler(
      validateSchema.validate(req.body)
    );
    if (errVaild && !vaild)
      return res.status(400).json({ message: errVaild?.message });

    const [data, err] = await promiseHandler(
      insertQueryOneItem(tableName, req.body)
    );

    if (err) {
      // console.log(err);
      return res
        .status(400)
        .json({ message: handleError(err, singleEntityName) });
    }

    return res.status(200).json({
      message: `The new ${singleEntityName} is added!`,
      id: createObjValuesArr(data)[0],
    });
  };

  // Controller of the post method.
  // Create many items in db by sending array of items.
  const createNewValuesInDB: RequestHandler = async (req, res) => {
    const [vaild, errVaild] = await promiseHandler(
      yup
        .array()
        .of(validateSchema)

        .validate(req.body)
    );

    if (errVaild && !vaild)
      return res.status(400).json({ message: errVaild?.message });
    const [data, err] = await promiseHandler(
      insertManyQuery(tableName, req.body)
    );
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something is went worng." });
    }
    return res.status(200).json({
      message: `The ${singleEntityName}s are added!`,
      id: createObjValuesArr(data)[0],
    });
  };

  // Controller of the post method. Create items in many different table.
  const createNewValuesInManyTablesInDB: RequestHandler = async (req, res) => {
    const [vaild, errVaild] = await promiseHandler(
      validateSchema.validate(req.body)
    );
    if (errVaild && !vaild)
      return res.status(400).json({ message: errVaild?.message });

    const [data, err] = await promiseHandler(
      insertQueryToManyTables(tableName, insertDataToOtherTables, req.body)
    );

    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something is went worng." });
    }
    return res.status(200).json({
      message: `The new ${singleEntityName} is added!`,
      id: createObjValuesArr(data)[0],
    });
  };

  // Controller of the put method.
  // Update one item by his ID in db.
  const updateValueByID: RequestHandler = async (req, res) => {
    const [vaild, errVaild] = await promiseHandler(
      validateSchema.validate(req.body)
    );

    if (errVaild && !vaild) {
      return res.status(400).json({ message: errVaild?.message });
    }
    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler(
      updateQuerySingleItem(tableName, req.body, req.params.id, queryLogic)
    );
    console.log(data);
    console.log(err);
    if (err)
      return res.status(400).json({ message: "Something is went worng." });
    return res.status(200).json({
      message: `The ${singleEntityName} is updated successfully!`,
      id: createObjValuesArr(data)[0],
    });
  };

  // Controller of the post method. Create items in many different table.
  const updateValuesInManyTablesInDB: RequestHandler = async (req, res) => {
    const [vaild, errVaild] = await promiseHandler(
      validateSchema.validate(req.body)
    );
    if (errVaild && !vaild)
      return res.status(400).json({ message: errVaild?.message });

    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler(
      updateQueryToManyTables(
        tableName,
        insertDataToOtherTables,
        req.body,
        req.params.id,
        queryLogic
      )
    );

    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something is went worng." });
    }
    return res.status(200).json({
      message: `The new ${singleEntityName} is updated successfully!`,
      id: createObjValuesArr(data)[0],
    });
  };

  // Controller of the delete method.
  // delete one item by his ID in db.
  const deleteValueByID: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler(
      deleteQuery(tableName, queryLogic, [id], true)
    );

    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something is went worng." });
    }

    return res.status(200).json({
      message: `The ${singleEntityName} is deleted successfully!`,
      id: createObjValuesArr(data)[0],
    });
  };

  return {
    getValuesFromDB,
    getValueFromDBbyID,
    getExtendsDataByID,
    createNewValueInDB,
    createNewValuesInDB,
    createNewValuesInManyTablesInDB,
    updateValueByID,
    updateValuesInManyTablesInDB,
    deleteValueByID,
  };
}
