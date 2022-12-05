import { handleInsertStatistics } from "../../statisticService/controllers/handleInsertStatistics";
import { OptionsCRUD } from "../CRUDServiceTypes";

import { createControllersHandlerAndRoutes } from "../utilities/helperServiceCRUD";

/**
 *
 * @param param0 Gets optionsCRUD and validateSchema
 * @returns Route object with all the CRUD controller functions.
 * @description Create the route with all the CRUD controller functions.
 */
export function createCRUDroutes(
  optionsCRUD: OptionsCRUD,
  disableRoute?: { getByID?: boolean; post?: boolean; put?: boolean }
) {
  const {
    controllerHandlersObj,
    routeByEntity,
    routeByEntityAndID,
    expressRouterObj,
  } = createControllersHandlerAndRoutes(optionsCRUD, disableRoute);

  // POST route for CRUD with insert Statistics
  !disableRoute?.post === true &&
    routeByEntity.post(
      controllerHandlersObj.createNewValueInDB,
      handleInsertStatistics
    );

  // PUT route for CRUD with insert Statistics
  !disableRoute?.put === true &&
    routeByEntityAndID.put(
      controllerHandlersObj.updateValueByID,
      handleInsertStatistics
    );

  return expressRouterObj;
}
