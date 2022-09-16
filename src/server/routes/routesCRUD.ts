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
    updateValueByID,
    deleteValueByID,
  } = createRoutesControllers(optionsCRUD);
  const newRoute = express.Router();
  newRoute.route("/").get(getValuesFromDB);

  newRoute.route(`/${optionsCRUD.singleEntityName}`).post(createNewValueInDB);

  newRoute
    .route(`/${optionsCRUD.singleEntityName}/:id`)
    .get(getValueFromDBbyID)
    .put(updateValueByID)
    .delete(deleteValueByID);
  return newRoute;
}
