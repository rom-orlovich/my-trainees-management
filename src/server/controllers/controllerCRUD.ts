/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { DatabaseError } from "pg";
import * as yup from "yup";
import {
  createRealQueryKeyValuesObj,
  deleteQuery,
  insertQueryOneItem,
  selectPagination,
  selectQuery,
  updateQuerySingleItem,
} from "../PGSql/sqlHelpers";
import { OptionsCRUD } from "../routes/routesConfig";

import { promiseHandler } from "../utilities/helpers";
import { ActionType, ErrorCodes, ErrorCustomizes } from "./handleErrors";

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
  },
  logAlert = true,
  validateSchema,
}: OptionsCRUD) {
  const createModifiedActionResult = (
    data: any | undefined,
    err: Error | undefined,
    action: ActionType
  ) => {
    if (err) {
      const errorCustomizes = new ErrorCustomizes(
        err,
        action,
        singleEntityName
      );

      errorCustomizes.handleErrors();

      return { error: errorCustomizes, logAlert };
    }
    const message = `The ${singleEntityName} was ${action}d successfully!`;
    return {
      message,
      data,
      logAlert,
    };
  };

  const validateMiddleware: RequestHandler = async (req, res, next) => {
    if (!validateSchema) return next();
    const [valid, errValid] = await promiseHandler<any, yup.ValidationError>(
      validateSchema.validate(req.body)
    );
    if (errValid && !valid)
      return next(new ErrorCustomizes({ code: ErrorCodes.INVALID }));
    return next();
  };

  // Controller of the get method. Gets data from the db.
  const getValuesFromDB: RequestHandler = async (req, res, next) => {
    const { page, asc, numResults, ...rest } = req.query;

    const ascDefault = (asc === undefined ? true : asc === "true") as boolean;
    const numResultDefault = Number(numResults || 10);
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
    const [data, err] = await promiseHandler(
      insertQueryOneItem(tableName, req.body)
    );

    req.modifiedActionResult = createModifiedActionResult(data, err, "create");
    return next(); // Continue to alerts handler middleware
  };

  // Controller of the put method.
  // Update one item by his ID in db.
  const updateValueByID: RequestHandler = async (req, res, next) => {
    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler<any, DatabaseError>(
      updateQuerySingleItem(tableName, req.body, req.params.id, queryLogic)
    );

    req.modifiedActionResult = createModifiedActionResult(data, err, "update");

    return next(); // Continue to alerts handler middleware
  };

  // Controller of the delete method.
  // delete one item by his ID in db.
  const deleteValueByID: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler(
      deleteQuery(tableName, queryLogic, [id], true)
    );

    const noDataError =
      data && data.length === 0
        ? {
            code: ErrorCodes.RESULT_NOT_fOUND,
            ...new Error("Results weren't found"),
          }
        : undefined;
    req.modifiedActionResult = createModifiedActionResult(
      data,
      noDataError,
      "delete"
    );

    return next(); // Continue to alerts handler middleware
  };

  return {
    validateMiddleware,
    getValuesFromDB,
    getValueFromDBbyID,
    createNewValueInDB,
    updateValueByID,
    deleteValueByID,
  };
}
