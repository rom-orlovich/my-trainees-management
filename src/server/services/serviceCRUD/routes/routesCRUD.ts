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
    validateMiddlewareHandler,
    updateValueByID,
    deleteValueByID,
  } = createRoutesControllers(optionsCRUD);

  const newRoute = express.Router();
  const singleEntityNameEndPoint = `/${optionsCRUD.singleEntityName}`;
  const singleEntityNameEndPointID = `${singleEntityNameEndPoint}/:id`;

  // Check if route has permissions object.
  // if (optionsCRUD.permissions.operations) {
  //   const {

  //     create,
  //     update,
  //     delete: deleteCRUD,
  //   } = optionsCRUD.permissions.operations;

  //   newRoute.get("/", getValuesFromDB);
  //    newRoute.get(singleEntityNameEndPointID, getValueFromDBbyID);
  //   create &&
  //     newRoute.post(
  //       singleEntityNameEndPoint,
  //       validateMiddlewareHandler,
  //       createNewValueInDB
  //     );
  //   update &&
  //     newRoute.put(
  //       singleEntityNameEndPointID,
  //       validateMiddlewareHandler,
  //       updateValueByID
  //     );
  //   deleteCRUD && newRoute.delete(singleEntityNameEndPointID, deleteValueByID);
  // } else {
  newRoute.route("/").get(getValuesFromDB);
  newRoute
    .route(singleEntityNameEndPoint)
    .post(validateMiddlewareHandler, createNewValueInDB);
  newRoute
    .route(singleEntityNameEndPointID)
    .get(getValueFromDBbyID)
    .put(validateMiddlewareHandler, updateValueByID)
    .delete(deleteValueByID);
  // }

  return newRoute;
}
