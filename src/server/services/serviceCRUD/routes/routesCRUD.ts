import express from "express";
import { TABLES_DATA } from "../../../utilities/constants";

import { API_ROUTES } from "../../apiRoutesConstants";
import { traineesSchema } from "../../schemas/DBSchemas";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
import { handleGetStatistic } from "../../serviceStatistics/controllers/handleGetStatistic";
import { handleInsertNewMeasure } from "../../serviceStatistics/controllers/handleInsertNewMeasure";
import { handleInsertStatistics } from "../../serviceStatistics/controllers/handleInsertStatistics";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";

import { createRoutesControllers } from "../controllers/controllerCRUD";

import { OptionsCRUD } from "./routesConfig";

/**
 *
 * @param param0 Gets optionsCRUD and validateSchema
 * @returns Route object with all the CRUD controller functions.
 * @description Create the route with all the CRUD controller functions.
 */
export function createCRUDroutes(optionsCRUD: OptionsCRUD) {
  const {
    getValuesFromDB,
    getValueFromDBbyID,
    createNewValueInDB,
    validateMiddlewareHandler,
    updateValueByID,
    deleteValueByID,
  } = createRoutesControllers(optionsCRUD);

  const newRoute = express.Router();
  const singleEntityNameEndPoint = `/${optionsCRUD.singleEntityName}`;
  const singleEntityNameEndPointID = `${singleEntityNameEndPoint}/:id`;

  newRoute.route("/").get(getValuesFromDB, handleGetStatistic);

  // TODO: try to refactor this if-check.
  // If the table is measures, the post and the put CRUD function will be executed after handleInsertNewMeasure.
  if (
    optionsCRUD.selectQuery.tableName.includes(TABLES_DATA.MEASURES_TABLE_NAME)
  ) {
    newRoute
      .route(singleEntityNameEndPoint)
      .post(
        validateMiddlewareHandler,
        handleInsertNewMeasure,
        createNewValueInDB
      );
    newRoute
      .route(singleEntityNameEndPointID)
      .put(validateMiddlewareHandler, handleInsertNewMeasure, updateValueByID);
  } else {
    newRoute
      .route(singleEntityNameEndPoint)
      .post(
        validateMiddlewareHandler,
        createNewValueInDB,
        handleInsertStatistics
      );

    newRoute
      .route(singleEntityNameEndPointID)
      .put(validateMiddlewareHandler, updateValueByID, handleInsertStatistics);
  }

  newRoute
    .route(singleEntityNameEndPointID)
    .get(getValueFromDBbyID)
    .delete(deleteValueByID);

  if (
    optionsCRUD.selectQuery.tableName.includes(TABLES_DATA.TRAINEES_TABLE_NAME)
  ) {
    const validateMiddlewareRegisterTrainee =
      validateMiddleware(traineesSchema);
    newRoute.post(
      API_ROUTES.REGISTER_TRAINEE_ROUTE,
      validateMiddlewareRegisterTrainee,
      handleRegisterTrainee
    );
  }
  return newRoute;
}
