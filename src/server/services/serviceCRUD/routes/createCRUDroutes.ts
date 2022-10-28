import { handleInsertStatistics } from "../../serviceStatistics/controllers/handleInsertStatistics";

import { createControllersHandlerAndRouterWithAppMiddleware } from "../utilities/helperServiceCRUD";

import { OptionsCRUD } from "./configRoutes";

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
  } = createControllersHandlerAndRouterWithAppMiddleware(optionsCRUD);

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

  // if (
  //   optionsCRUD.selectQuery.tableName.includes(TABLES_DATA.TRAINEES_TABLE_NAME)
  // ) {
  //   expressRouterObj.post(
  //     API_ROUTES.REGISTER_TRAINEE_ROUTE,
  //     controllerHandlersObj.validateMiddlewareHandler,
  //     handleRegisterTrainee
  //   );
  // }
  return expressRouterObj;
}
