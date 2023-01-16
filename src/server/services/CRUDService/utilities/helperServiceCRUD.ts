import express from "express";

import {
  validateRolePermission,
  validateTokenMiddleware,
} from "../../authService/controllers/validateAuthMiddleware";
import { handleGetStatistic } from "../../statisticService/controllers/handleGetStatistic";
import { createRoutesControllers } from "../controllers/controllerCRUD";
import { DisableRoutes, OptionsCRUD } from "../CRUDServiceTypes";

/**
 *
 * @param optionsCRUD
 * Function that initials the router and controllers handlers
 * create the base routes and routes entity endpoint with/without id.
 */
export const createBaseRouterControllerWithAuthMiddleware = (
  optionsCRUD: OptionsCRUD
) => {
  const expressRouterObj = express.Router();
  const singleEntityNameEndPoint = `/${optionsCRUD.singleEntityName}`;
  const singleEntityNameEndPointID = `${singleEntityNameEndPoint}/:id`;

  // Middleware of token's and permission validation
  expressRouterObj.use(
    validateTokenMiddleware,
    validateRolePermission(optionsCRUD.permissions)
  );

  const routeByBaseRoute = expressRouterObj.route("/");
  const routeByEntity = expressRouterObj.route(singleEntityNameEndPoint);
  const routeByEntityAndID = expressRouterObj.route(singleEntityNameEndPointID);

  return {
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
export const createControllersHandlerAndRoutes = (
  optionsCRUD: OptionsCRUD,
  disableRoutes?: DisableRoutes
) => {
  const {
    expressRouterObj,
    routeByBaseRoute,
    routeByEntityAndID,
    routeByEntity,
  } = createBaseRouterControllerWithAuthMiddleware(optionsCRUD);

  const controllerHandlersObj = createRoutesControllers(optionsCRUD);

  // GET route, middleware and handleGetStatistic.
  disableRoutes?.get !== true &&
    routeByBaseRoute.get(
      controllerHandlersObj.getValuesFromDB,
      handleGetStatistic
    );

  // GET and DELETE by id route and middleware.
  disableRoutes?.getByID !== true &&
    routeByEntityAndID.get(controllerHandlersObj.getValueFromDBbyID);
  disableRoutes?.deleteByID !== true &&
    routeByEntityAndID.delete(controllerHandlersObj.deleteValueByID);

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
