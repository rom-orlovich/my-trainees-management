/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { DatabaseError } from "pg";

import {
  deleteTableWithOtherTableData,
  selectPagination,
  updateExistTableData,
} from "../../../PGSql/complexSqlQueries";
import { promiseHandler } from "../../../utilities/helpers";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import { ErrorCodes, ErrorCustomizes } from "../../errorsService/errorsService";
import { validateMiddleware } from "../../validateService/validateMiddleware";
import { client } from "../../../PGSql/DBConnectConfig";
import { OptionsCRUD } from "../CRUDServiceTypes";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  insertQueryOneItem,
  selectQuery,
} from "../../../PGSql/simpleSqlQueries";

const URL_STATISTIC: string[] = [
  API_ROUTES.EXERCISES_STATS_ROUTE,
  API_ROUTES.MEASURES_ROUTE,
  API_ROUTES.LEADS_ROUTE,
  API_ROUTES.INCOMES_ROUTE,
  API_ROUTES.TRAINEES_ROUTE,
];

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
    orderByParam,
    comparisonQuery,
    groupBy,
  },
  logAlert = true,
  validateSchema,
}: OptionsCRUD) {
  const prepareLogAlert = createLogAlertInfo(singleEntityName);
  // Controller of the get method. Gets data from the db.
  const getValuesFromDB: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();

    const selectPaginationQueryParam = {
      requestQuery: req.query,
      queryParams,
      queryNameParam,
      orderByParam,
      comparisonQuery,
    };
    const tablePropsData = {
      tableName,
      fieldNamesQuery,
      querySelectLogic: `${querySelectLogic} ${
        req?.querySelectLogicAddOns || ""
      }`,
      groupBy,
      tableID,
    };

    const [data, err] = await promiseHandler(
      selectPagination(tablePropsData, selectPaginationQueryParam)
    );

    if (err) return next(new ErrorCustomizes(err));
    const responseData = {
      data: data.rows,
      next: data.next,
      countRows: data.countRows,
    };

    if (URL_STATISTIC.includes(req.baseUrl)) {
      req.statsData = { statsResult: responseData };
      return next();
    }
    return res.status(200).json(responseData);
  };

  // Controller of the get method. Gets one item by ID from the db.
  const getValueFromDBbyID: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();
    const queryLogic = `${`${querySelectLogic} ${
      req?.querySelectLogicAddOns || ""
    }`}  WHERE ${tableID}=$1`;
    const id = Number(req.params.id);

    const [data, err] = await promiseHandler(
      selectQuery(tableName, `${fieldNamesQuery}`, queryLogic, [id])
    );

    if (err) return next(new ErrorCustomizes(err, "get"));

    return res.status(200).json(data[0]);
  };

  // Controller of the post method. Create one item  in the db.
  const createNewValueInDB: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();

    const [data, err] = await promiseHandler(
      insertQueryOneItem(tableName, req.body)
    );

    if (err) {
      req.logAlertInfo = prepareLogAlert(undefined, err, "create", logAlert);
      return next();
    }

    if (req.baseUrl === API_ROUTES.TRAINING_PROGRAMS_ROUTE)
      req.statsData = {
        updateExerciseData: data,
      };

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
        tableID,
        req.body,
        req.params.id,
        modifiedOtherTable?.update
      )
    );

    // Rollback the query if there is error.
    if (err) {
      await client.query("ROLLBACK");
      req.logAlertInfo = prepareLogAlert(undefined, err, "update", logAlert);
      return next();
    }

    if (req.baseUrl === API_ROUTES.TRAINING_PROGRAMS_ROUTE)
      req.statsData = {
        updateExerciseData: data,
      };

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
    if (req.logAlertInfo?.error) return next();
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
