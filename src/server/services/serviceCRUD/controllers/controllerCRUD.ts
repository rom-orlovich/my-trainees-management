/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { DatabaseError } from "pg";

import {
  createRealQueryKeyValuesObj,
  deleteTableWithOtherTableData,
  insertQueryOneItem,
  selectPagination,
  selectQuery,
  updateExistTableData,
} from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";
import { ErrorCodes, ErrorCustomizes } from "../../serviceErrors/handleErrors";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import { client } from "../../../PGSql/DBConnectConfig";
import { TABLES_DATA } from "../../../utilities/constants";
import { ComparisonQuery, OptionsCRUD } from "../serviceCRUDTypes";
import { TrainingProgramExercise } from "../../serviceStatistics/utilities/helpersStatisticsService";

const createSelectQueryParams = (
  queryParams: Record<string, any>,
  queryValueParams: Record<string, any> | undefined,
  queryNameParam: Record<string, any> | undefined,
  orderByParam: Record<string, string> | undefined,
  comparisonQuery: ComparisonQuery | undefined
) => {
  const {
    page,
    asc,
    numResults,
    caloriesPie,
    measuresChartLine,
    orderBy,
    gt,
    lt,
    ...rest
  } = queryParams;

  const ascDefault = (asc === undefined ? true : asc === "true") as boolean;
  const numResultDefault = Number(numResults || 5);
  const maxNumResult = numResultDefault > 100 ? 100 : numResultDefault;
  const comparisonQueryKeyValue = comparisonQuery
    ? {
        gt: [comparisonQuery.gt, gt as string],
        lt: [comparisonQuery.lt, lt as string],
      }
    : { gt: [], lt: [] };
  const orderByParamRes =
    orderByParam && orderBy ? orderByParam[orderBy as string] : "";
  const realQueryParams = createRealQueryKeyValuesObj(rest, queryValueParams);
  const realQueryByNameParams = createRealQueryKeyValuesObj(
    rest,
    queryNameParam
  );
  return {
    page,
    ascDefault,
    maxNumResult,
    realQueryParams,
    realQueryByNameParams,
    comparisonQueryKeyValue,
    orderByParamRes,
  };
};

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

    const {
      ascDefault,
      comparisonQueryKeyValue,
      maxNumResult,
      page,
      realQueryParams,
      realQueryByNameParams,
      orderByParamRes,
    } = createSelectQueryParams(
      req.query,
      queryParams,
      queryNameParam,
      orderByParam,
      comparisonQuery
    );

    const [data, err] = await promiseHandler(
      selectPagination(
        tableName,
        page as string,
        fieldNamesQuery,
        querySelectLogic,
        realQueryParams,
        realQueryByNameParams,
        ascDefault,
        maxNumResult,
        orderByParamRes || tableID,
        comparisonQueryKeyValue,
        groupBy
      )
    );

    if (err) return next(new ErrorCustomizes(err));
    const responseData = {
      data: data.rows,
      next: data.next,
      countRows: data.countRows,
    };
    if (
      tableName.includes(
        TABLES_DATA.TRAINING_PROGRAM_EXERCISES_STATS_TABLE_NAME
      )
    ) {
      req.statsData = { statsResult: { exerciseStats: responseData } };
      return next();
    }
    if (tableName.includes(TABLES_DATA.MEASURES_TABLE_NAME)) {
      req.statsData = { statsResult: { measures: responseData } };
      return next();
    }

    return res.status(200).json(responseData);
  };

  // Controller of the get method. Gets one item by ID from the db.
  const getValueFromDBbyID: RequestHandler = async (req, res, next) => {
    if (req.logAlertInfo?.error) return next();
    const queryLogic = `${querySelectLogic}  WHERE ${tableID}=$1`;
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

    if (tableName.includes(TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME)) {
      req.statsData = {
        updateExerciseData: data as TrainingProgramExercise,
      };
    }

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

    if (tableName.includes(TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME)) {
      req.statsData = {
        updateExerciseData: data,
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
