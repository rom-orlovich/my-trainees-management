/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { RequestHandler } from "webpack-dev-server";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";

import { handleDeleteAllUserAlerts } from "../../serviceAlerts/handleAlerts";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
import { handleGetFinanceStats } from "../../serviceStatistics/controllers/handleGetFinanceStats";
import { handleGetStatistic } from "../../serviceStatistics/controllers/handleGetStatistic";
import { handleInsertNewMeasure } from "../../serviceStatistics/controllers/handleInsertNewMeasure";
import { handleInsertStatistics } from "../../serviceStatistics/controllers/handleInsertStatistics";

import { handleInsertNewSubscription } from "../controllers/handleInsertNewSubscription";

import {
  createControllersHandlerAndRouterWithAuthMiddleware,
  createControllersHandlerAndRoutes,
} from "../utilities/helperServiceCRUD";
import {
  alertsOptionsCRUD,
  financesStatsOptionsCRUD,
  incomesOptionsCRUD,
  measuresOptionsCRUD,
  meetingOptionsCRUD,
  traineesOptionsCRUD,
} from "./configRoutes";
import { createCRUDroutes } from "./createCRUDroutes";

export const createMeasuresRouter = () => {
  const {
    controllerHandlersObj: { createNewValueInDB, updateValueByID },
    expressRouterObj,
    routeByEntity,
    routeByEntityAndID,
  } = createControllersHandlerAndRoutes(measuresOptionsCRUD);
  routeByEntity.post(handleInsertNewMeasure, createNewValueInDB);
  routeByEntityAndID.put(handleInsertNewMeasure, updateValueByID);
  return expressRouterObj;
};

export const createTraineesRouter = () => {
  const {
    controllerHandlersObj: { updateValueByID },
    expressRouterObj,

    routeByEntityAndID,
  } = createControllersHandlerAndRoutes(traineesOptionsCRUD);
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
  } = createControllersHandlerAndRoutes(incomesOptionsCRUD);

  routeByEntity.post(
    controllerHandlersObj.createNewValueInDB,
    handleInsertNewSubscription
  );

  routeByEntityAndID.put(controllerHandlersObj.updateValueByID);

  return expressRouterObj;
};

export const createFinanceRouter = () => {
  const { routeByBaseRoute, expressRouterObj } =
    createControllersHandlerAndRouterWithAuthMiddleware(
      financesStatsOptionsCRUD
    );
  routeByBaseRoute.get(handleGetFinanceStats, handleGetStatistic);

  return expressRouterObj;
};

export const createMeetingRouter = () => {
  const {
    controllerHandlersObj,
    expressRouterObj,
    routeByBaseRoute,
    routeByEntity,
    routeByEntityAndID,
  } = createControllersHandlerAndRouterWithAuthMiddleware(meetingOptionsCRUD);

  const getMeetingTraineeHandler: RequestHandler = (req, res, next) => {
    if (req.query.traineeID) {
      req.querySelectLogicAddOns = `LEFT JOIN ${TABLES_DATA.PARTICIPANTS_GROUP_TABLE_NAME} as pg ON
      pgl.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}= pg.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}`;
    } else req.querySelectLogicAddOns = "";
    next();
  };
  // GET route, middleware and handleGetStatistic.
  routeByBaseRoute.get(
    getMeetingTraineeHandler,
    controllerHandlersObj.getValuesFromDB
  );

  // GET and DELETE by id route and middleware.
  routeByEntityAndID
    .get(getMeetingTraineeHandler, controllerHandlersObj.getValueFromDBbyID)
    .delete(controllerHandlersObj.deleteValueByID);

  routeByEntity.post(
    controllerHandlersObj.validateMiddlewareHandler,
    controllerHandlersObj.createNewValueInDB
  );
  routeByEntityAndID.put(
    controllerHandlersObj.validateMiddlewareHandler,
    controllerHandlersObj.updateValueByID
  );

  return expressRouterObj;
};
