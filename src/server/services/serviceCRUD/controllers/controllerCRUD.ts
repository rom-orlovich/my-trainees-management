/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { DatabaseError } from "pg";
import * as yup from "yup";
import {
  createRealQueryKeyValuesObj,
  deleteQuery,
  deleteTableWithOtherTableData,
  insertNewTableData,
  insertQueryOneItem,
  selectPagination,
  selectQuery,
  updateExistTableData,
} from "../../../PGSql/sqlHelpers";
import { OptionsCRUD } from "../routes/routesConfig";

import { promiseHandler } from "../../../utilities/helpers";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";

import { ErrorCodes, ErrorCustomizes } from "../../serviceErrors/handleErrors";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import { client } from "../../../PGSql/DBConnectConfig";
import { TABLES_DATA } from "../../../utilities/constants";

/**
 *
 * @param param0 Options of the CRUD controller routes.
 * @returns Object that contains all the  functions of CRUD controllers.
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
    modifiedOtherTable,
  },
  logAlert = true,
  validateSchema,
}: OptionsCRUD) {
  const prepareLogAlert = createLogAlertInfo(singleEntityName);
  // Controller of the get method. Gets data from the db.
  const getValuesFromDB: RequestHandler = async (req, res, next) => {
    const { page, asc, numResults, ...rest } = req.query;

    const ascDefault = (asc === undefined ? true : asc === "true") as boolean;
    const numResultDefault = Number(numResults || 5);
    const [data, err] = await promiseHandler(
      selectPagination(
        tableID,
        tableName,
        page as string,
        fieldNamesQuery,
        querySelectLogic,
        createRealQueryKeyValuesObj(rest, queryParams),
        createRealQueryKeyValuesObj(rest, queryNameParam),
        ascDefault,
        numResultDefault
      )
    );

    if (err) return next(new ErrorCustomizes(err));

    return res
      .status(200)
      .json({ data: data.rows, next: data.next, countRows: data.countRows });
  };

  // Controller of the get method. Gets one item by ID from the db.
  const getValueFromDBbyID: RequestHandler = async (req, res, next) => {
    const queryLogic = `${querySelectLogic}  WHERE ${tableID}=$1`;
    const id = Number(req.params.id);

    const [data, err] = await promiseHandler(
      selectQuery(`${tableName}`, `${fieldNamesQuery}`, queryLogic, [id])
    );

    if (err) return next(new ErrorCustomizes(err, "get"));
    return res.status(200).json(data[0]);
  };

  // Controller of the post method. Create one item  in the db.
  const createNewValueInDB: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();

    const [data, err] = await promiseHandler(
      await insertQueryOneItem(tableName, req.body)
    );

    req.logAlertInfo = prepareLogAlert(
      { data, statusCode: 201, sendDataID: true },
      err,
      "create",
      logAlert
    );
    return next(); // Continue to alerts handler middleware
  };

  // Controller of the put method.
  // Update one item by his ID in db.
  const updateValueByID: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();

    const [data, err] = await promiseHandler<any, DatabaseError>(
      updateExistTableData(
        tableName,
        req.body,
        tableID,
        req.params.id,
        modifiedOtherTable?.update
      )
    );
    // Rollback the query if there is error.
    if (err) {
      await client.query("ROLLBACK");
    }

    if (tableName.includes(TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME)) {
      req.data_for_stats = {
        trainingProgramExerciseData: data,
      };
    }

    req.logAlertInfo = prepareLogAlert(
      { data, statusCode: 201, sendDataID: true },
      err,
      "update",
      logAlert
    );

    return next(); // Continue to alerts handler middleware
  };

  // Controller of the delete method.
  // delete one item by his ID in db.
  const deleteValueByID: RequestHandler = async (req, res, next) => {
    // const { id } = req.params;
    // const queryLogic = `WHERE ${tableID}=$1`;

    // const [data, err] = await promiseHandler(
    //   deleteQuery(tableName, queryLogic, [id], true)
    // );
    const [data, err] = await deleteTableWithOtherTableData(
      tableName,
      tableID,
      req.params.id,
      modifiedOtherTable?.delete
    );

    const noDataError =
      data && data.length === 0
        ? {
            code: ErrorCodes.RESULT_NOT_FOUND,
            message: "Results weren't found",
          }
        : undefined;

    req.logAlertInfo = prepareLogAlert(
      { data, statusCode: 200, sendDataID: true },
      err || noDataError,
      "delete",
      logAlert
    );

    return next(); // Continue to alerts handler middleware
  };

  return {
    validateMiddlewareHandler: validateMiddleware(validateSchema),
    getValuesFromDB,
    getValueFromDBbyID,
    createNewValueInDB,
    updateValueByID,
    deleteValueByID,
  };
}
