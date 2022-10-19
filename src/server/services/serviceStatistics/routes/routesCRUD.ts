import express from "express";

import { API_ROUTES } from "../../apiRoutesConstants";
import { traineesSchema } from "../../schemas/DBSchemas";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
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

  if (optionsCRUD.singleEntityName === API_ROUTES.TRAINEES_ENTITY) {
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
    .put(validateMiddlewareHandler, updateValueByID)
    .delete(deleteValueByID);

  return newRoute;
}
