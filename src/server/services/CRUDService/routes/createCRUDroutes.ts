import { handleInsertStatistics } from "../../statisticService/controllers/handleInsertStatistics";
import { DisableRoutes, OptionsCRUD } from "../CRUDServiceTypes";

import { createControllersHandlerAndRoutes } from "../utilities/helperServiceCRUD";

/**
 *
 * @param param0 Gets optionsCRUD and validateSchema
 * @returns Route object with all the CRUD controller functions.
 * @description Create the route with all the CRUD controller functions.
 */
export function createCRUDroutes(
  optionsCRUD: OptionsCRUD,
  disableRoutes?: DisableRoutes
) {
  const {
    controllerHandlersObj,
    routeByEntity,
    routeByEntityAndID,
    expressRouterObj,
  } = createControllersHandlerAndRoutes(optionsCRUD, disableRoutes);

  // POST route for CRUD with insert Statistics
  disableRoutes?.post !== true &&
    routeByEntity.post(
      controllerHandlersObj.createNewValueInDB,
      handleInsertStatistics
    );

  // PUT route for CRUD with insert Statistics
  disableRoutes?.put !== true &&
    routeByEntityAndID.put(
      controllerHandlersObj.updateValueByID,
      handleInsertStatistics
    );

  return expressRouterObj;
}
