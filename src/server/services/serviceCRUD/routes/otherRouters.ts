/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { RequestHandler } from "webpack-dev-server";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import { handleDeleteAllUserAlerts } from "../../serviceAlerts/handleAlerts";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
import { handleInsertNewMeasure } from "../../serviceStatistics/controllers/handleInsertNewMeasure";
import {
  formatMeetingToHaveParticipantsGroupArr,
  handleGetMeetingsHaveGroupArr,
  handleGetParticipantsGroup,
} from "../controllers/handleGetParticipantsGroup";
import { handleInsertNewSubscription } from "../controllers/handleInsertNewSubscription";
import {
  handleInsertParticipantsGroup,
  MeetingAPI,
} from "../controllers/handleInsertParticipantsGroup";
import { createControllersHandlerAndRouterWithAppMiddleware } from "../utilities/helperServiceCRUD";
import {
  alertsOptionsCRUD,
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

export const createMeetingRouter = () => {
  const {
    routeByEntity,
    routeByEntityAndID,
    controllerHandlersObj,
    expressRouterObj,
    routeByBaseRoute,
  } = createControllersHandlerAndRouterWithAppMiddleware(meetingOptionsCRUD);
  const insertParticipantsMiddleware: RequestHandler = (req, res, next) => {
    if (req.method === "PUT" || req.method === "POST")
      logger.debug(`LINE 91:${req.url}  ${req.method} - req.body`, {
        objs: [req.body],
        __filename,
      });

    if (req.logAlertInfo?.error) return next();
    const { participants_group, ...rest } = req.body as MeetingAPI;
    req.insertParticipants = {
      participantGroup: participants_group?.map(
        ({ first_name, last_name, ...el }) => ({
          ...el,
        })
      ),
      user_id: rest.user_id,
    };
    req.body = rest;
    return next();
  };

  // routeByBaseRoute.get(handleGetMeetingsHaveGroupArr);

  // routeByEntityAndID.get(handleGetParticipantsGroup);

  routeByEntity.post(
    insertParticipantsMiddleware,
    controllerHandlersObj.createNewValueInDB,
    handleInsertParticipantsGroup
  );

  routeByEntityAndID.put(
    insertParticipantsMiddleware,
    controllerHandlersObj.updateValueByID,
    handleInsertParticipantsGroup
  );

  return expressRouterObj;
};
