/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { RequestHandler } from "webpack-dev-server";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import { handleDeleteAllUserAlerts } from "../../serviceAlerts/handleAlerts";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
import { handleInsertNewMeasure } from "../../serviceStatistics/controllers/handleInsertNewMeasure";

import { handleInsertNewSubscription } from "../controllers/handleInsertNewSubscription";

import { createControllersHandlerAndRouterWithAppMiddleware } from "../utilities/helperServiceCRUD";
import {
  alertsOptionsCRUD,
  incomesOptionsCRUD,
  measuresOptionsCRUD,
  traineesOptionsCRUD,
} from "./configRoutes";
import { createCRUDroutes } from "./createCRUDroutes";

export const createMeasuresRouter = () => {
  const {
    controllerHandlersObj: { createNewValueInDB, updateValueByID },
    expressRouterObj,
    routeByEntity,
    routeByEntityAndID,
  } = createControllersHandlerAndRouterWithAppMiddleware(measuresOptionsCRUD);
  routeByEntity.post(handleInsertNewMeasure, createNewValueInDB);
  routeByEntityAndID.put(handleInsertNewMeasure, updateValueByID);
  return expressRouterObj;
};

export const createTraineesRouter = () => {
  const {
    controllerHandlersObj: { updateValueByID },
    expressRouterObj,

    routeByEntityAndID,
  } = createControllersHandlerAndRouterWithAppMiddleware(traineesOptionsCRUD);
  expressRouterObj.post(
    API_ROUTES.REGISTER_TRAINEE_ROUTE,
    handleRegisterTrainee
  );
  routeByEntityAndID.put(updateValueByID);
  return expressRouterObj;
};

export const createAlertsRouter = () => {
  const alertRoute = createCRUDroutes(alertsOptionsCRUD);
  alertRoute.delete("", handleDeleteAllUserAlerts);
  return alertRoute;
};

export const createIncomesRouter = () => {
  const {
    routeByEntity,
    routeByEntityAndID,
    controllerHandlersObj,
    expressRouterObj,
  } = createControllersHandlerAndRouterWithAppMiddleware(incomesOptionsCRUD);

  routeByEntity.post(
    controllerHandlersObj.createNewValueInDB,
    handleInsertNewSubscription
  );

  routeByEntityAndID.put(controllerHandlersObj.updateValueByID);

  return expressRouterObj;
};
