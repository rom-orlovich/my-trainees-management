import express from "express";
import {
  validateRolePermission,
  validateTokenMiddleware,
} from "../../serviceAuth/controllers/validateAuthMiddleware";
import { handleGetStatistic } from "../../serviceStatistics/controllers/handleGetStatistic";
import { createRoutesControllers } from "../controllers/controllerCRUD";
import { OptionsCRUD } from "../routes/configRoutes";

/**
 *
 * @param optionsCRUD
 * Function that create the router and controllers handlers
 * and relates him to base route and route entity endpoint with/without id.
 */
export const createControllersHandlerAndRouter = (optionsCRUD: OptionsCRUD) => {
  const expressRouterObj = express.Router();
  const singleEntityNameEndPoint = `/${optionsCRUD.singleEntityName}`;
  const singleEntityNameEndPointID = `${singleEntityNameEndPoint}/:id`;
  const controllerHandlersObj = createRoutesControllers(optionsCRUD);

  const routeByBaseRoute = expressRouterObj.route("/");
  const routeByEntity = expressRouterObj.route(singleEntityNameEndPoint);
  const routeByEntityAndID = expressRouterObj.route(singleEntityNameEndPointID);

  return {
    controllerHandlersObj,
    expressRouterObj,
    routeByBaseRoute,
    routeByEntity,
    routeByEntityAndID,
  };
};

/**
 *
 * @param optionsCRUD
 *Function that create a router that handle the token and permission middleware,
 * getting/deleting data from the db with/without id controllers.
 */
export const createControllersHandlerAndRouterWithAppMiddleware = (
  optionsCRUD: OptionsCRUD
) => {
  const {
    expressRouterObj,
    routeByBaseRoute,
    routeByEntityAndID,
    routeByEntity,
    controllerHandlersObj,
  } = createControllersHandlerAndRouter(optionsCRUD);

  // Middleware of token's and permission validation
  expressRouterObj.use(
    validateTokenMiddleware,
    validateRolePermission(optionsCRUD.permissions)
  );

  //   GET route, middleware and handleGetStatistic.
  routeByBaseRoute.get(
    controllerHandlersObj.getValuesFromDB,
    handleGetStatistic
  );

  // GET and DELETE by id route and middleware.
  routeByEntityAndID
    .get(controllerHandlersObj.getValueFromDBbyID)
    .delete(controllerHandlersObj.deleteValueByID);

  routeByEntity.post(controllerHandlersObj.validateMiddlewareHandler);
  routeByEntityAndID.put(controllerHandlersObj.validateMiddlewareHandler);

  return {
    controllerHandlersObj,
    expressRouterObj,
    routeByBaseRoute,
    routeByEntity,
    routeByEntityAndID,
  };
};
