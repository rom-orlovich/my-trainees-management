import express from "express";

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
    validateMiddleware,
    updateValueByID,
    deleteValueByID,
  } = createRoutesControllers(optionsCRUD);

  const newRoute = express.Router();
  newRoute.route("/").get(getValuesFromDB);

  newRoute
    .route(`/${optionsCRUD.singleEntityName}`)
    .post(validateMiddleware, createNewValueInDB);

  newRoute
    .route(`/${optionsCRUD.singleEntityName}/:id`)
    .get(getValueFromDBbyID)
    .put(validateMiddleware, updateValueByID)
    .delete(deleteValueByID);
  return newRoute;
}
