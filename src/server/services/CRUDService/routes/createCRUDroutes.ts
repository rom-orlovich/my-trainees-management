import { handleInsertStatistics } from "../../statisticService/controllers/handleInsertStatistics";
import { OptionsCRUD } from "../serviceCRUDTypes";

import { createControllersHandlerAndRoutes } from "../utilities/helperServiceCRUD";

/**
 *
 * @param param0 Gets optionsCRUD and validateSchema
 * @returns Route object with all the CRUD controller functions.
 * @description Create the route with all the CRUD controller functions.
 */
export function createCRUDroutes(optionsCRUD: OptionsCRUD) {
  const {
    controllerHandlersObj,
    routeByEntity,
    routeByEntityAndID,
    expressRouterObj,
  } = createControllersHandlerAndRoutes(optionsCRUD);

  // POST route for CRUD with insert Statistics
  routeByEntity.post(
    controllerHandlersObj.createNewValueInDB,
    handleInsertStatistics
  );

  // PUT route for CRUD with insert Statistics
  routeByEntityAndID.put(
    controllerHandlersObj.updateValueByID,
    handleInsertStatistics
  );

  return expressRouterObj;
}
