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
  const singleEntityNameEndPoint = `/${optionsCRUD.singleEntityName}`;
  const singleEntityNameEndPointID = `${singleEntityNameEndPoint}/:id`;

  // Check if route has permissions object.
  if (optionsCRUD.permissions) {
    const {
      read,
      create,
      update,
      delete: deleteCRUD,
    } = optionsCRUD.permissions;
    read && newRoute.get("/", getValuesFromDB);
    read && newRoute.get(singleEntityNameEndPointID, getValueFromDBbyID);
    create &&
      newRoute.post(
        singleEntityNameEndPoint,
        validateMiddleware,
        createNewValueInDB
      );
    update &&
      newRoute.put(
        singleEntityNameEndPointID,
        validateMiddleware,
        updateValueByID
      );
    deleteCRUD && newRoute.delete(singleEntityNameEndPointID, deleteValueByID);
  } else {
    newRoute.route("/").get(getValuesFromDB);
    newRoute
      .route(singleEntityNameEndPoint)
      .post(validateMiddleware, createNewValueInDB);
    newRoute
      .route(singleEntityNameEndPointID)
      .get(getValueFromDBbyID)
      .put(validateMiddleware, updateValueByID)
      .delete(deleteValueByID);
  }

  return newRoute;
}
