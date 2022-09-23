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
import { TABLES_DATA } from "../utilities/constants";
import { createObjValuesArr, promiseHandler } from "../utilities/helpers";
import { ErrorCodes, ErrorCustomizes } from "./handleErrors";

const createNewAlert = async (message: string) => {
  const [_, errData] = await promiseHandler(
    insertQueryOneItem(TABLES_DATA.ALERTS_TABLE_NAME, {
      alert_message: message,
    })
  );

  if (errData) {
    console.log(errData);
  }
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
  },

  validateSchema,
}: OptionsCRUD) {
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
    const { page, ...rest } = req.query;

    const [data, err] = await promiseHandler(
      selectPagination(
        tableID,
        tableName,
        page as string,
        fieldNamesQuery,
        querySelectLogic,
        createRealQueryKeyValuesObj(rest, queryParams),
        createRealQueryKeyValuesObj(rest, queryNameParam)
      )
    );

    if (err) return next(new ErrorCustomizes(err));
    return res.status(200).json({ data: data.rows, next: data.next });
  };

  // Controller of the get method. Gets one item by ID from the db.
  const getValueFromDBbyID: RequestHandler = async (req, res, next) => {
    const queryLogic = `${querySelectLogic}  WHERE ${tableID}=$1`;
    const id = Number(req.params.id);

    const [data, err] = await promiseHandler(
      selectQuery(`${tableName}`, `${fieldNamesQuery}`, queryLogic, [id])
    );

    if (err)
      return next(
        new ErrorCustomizes(err, `Cannot get exist ${singleEntityName}`)
      );
    return res.status(200).json(data[0]);
  };

  // Controller of the post method. Create one item  in the db.
  const createNewValueInDB: RequestHandler = async (req, res, next) => {
    const [data, err] = await promiseHandler(
      insertQueryOneItem(tableName, req.body)
    );

    if (err) {
      return next(
        new ErrorCustomizes(
          err,
          `Cannot add new ${singleEntityName}`,
          singleEntityName
        )
      );
    }

    const message = `The new ${singleEntityName} is added!`;
    req.modifiedActionResult = {
      message,
      data,
    };
    return next(); // Continue to alerts handler middleware
    // const message = `The new ${singleEntityName} is added!`;
    // await createNewAlert(message);
    // return res.status(200).json({
    //   message,
    //   id: createObjValuesArr(data)[0],
    // });
  };

  // Controller of the put method.
  // Update one item by his ID in db.
  const updateValueByID: RequestHandler = async (req, res, next) => {
    const queryLogic = `WHERE ${tableID}=$1`;

    const [data, err] = await promiseHandler<any, DatabaseError>(
      updateQuerySingleItem(tableName, req.body, req.params.id, queryLogic)
    );

    if (err)
      return next(
        new ErrorCustomizes(
          err,
          `Cannot update exist ${singleEntityName}`,
          singleEntityName
        )
      );

    const message = `The ${singleEntityName} is updated successfully!`;
    req.modifiedActionResult = {
      message,
      data,
    };
    // await createNewAlert(message);
    // return res.status(200).json({
    //   message,
    //   id: createObjValuesArr(data)[0],
    // });
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

    if (err)
      return next(
        new ErrorCustomizes(err, `Cannot delete exist ${singleEntityName}`)
      );

    const message = `The ${singleEntityName} is deleted successfully!`;
    req.modifiedActionResult = {
      message,
      data: data[0],
    };
    return next(); // Continue to alerts handler middleware
    // await createNewAlert(message);

    // return res.status(200).json({
    //   message,
    //   id: createObjValuesArr(data)[0],
    // });
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
