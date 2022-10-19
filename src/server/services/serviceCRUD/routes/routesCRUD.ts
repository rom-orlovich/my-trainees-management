import express from "express";
import { TABLES_DATA } from "../../../utilities/constants";

import { API_ROUTES } from "../../apiRoutesConstants";
import { traineesSchema } from "../../schemas/DBSchemas";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
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

  if (optionsCRUD.singleEntityName.includes(API_ROUTES.TRAINEES_ENTITY)) {
    const validateMiddlewareRegisterTrainee =
      validateMiddleware(traineesSchema);
    newRoute.post(
      API_ROUTES.REGISTER_TRAINEE_ROUTE,
      validateMiddlewareRegisterTrainee,
      handleRegisterTrainee
    );
  }

  newRoute.route("/").get(getValuesFromDB);
  newRoute
    .route(singleEntityNameEndPoint)
    .post(validateMiddlewareHandler, createNewValueInDB);
  newRoute
    .route(singleEntityNameEndPointID)
    .get(getValueFromDBbyID)
    .delete(deleteValueByID);

  if (
    optionsCRUD.selectQuery.tableName.includes(
      TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME
    )
  ) {
    newRoute
      .route(singleEntityNameEndPointID)
      .put(validateMiddlewareHandler, updateValueByID, handleInsertStatistics);
  } else {
    newRoute
      .route(singleEntityNameEndPointID)
      .put(validateMiddlewareHandler, updateValueByID);
  }
  return newRoute;
}
