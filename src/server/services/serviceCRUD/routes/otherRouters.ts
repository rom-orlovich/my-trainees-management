/* eslint-disable camelcase */
import { RequestHandler } from "webpack-dev-server";
import { API_ROUTES } from "../../apiRoutesConstants";
import { handleDeleteAllUserAlerts } from "../../serviceAlerts/handleAlerts";
import { handleRegisterTrainee } from "../../serviceAuth/controllers/handleRegisterTrainee";
import { handleInsertNewMeasure } from "../../serviceStatistics/controllers/handleInsertNewMeasure";
import { handleGetParticipantsGroup } from "../controllers/handleGetParticipantsGroup";
import { handleInsertNewSubscription } from "../controllers/handleInsertNewSubscription";
import {
  handleInsertParticipantsGroup,
  MeetingsTableAPI,
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
  } = createControllersHandlerAndRouterWithAppMiddleware(meetingOptionsCRUD);
  const excludedBodyMiddleware: RequestHandler = (req, res, next) => {
    const { participants_group, ...rest } = req.body as MeetingsTableAPI;
    req.excludedBody = {
      participantGroup: participants_group,
      user_id: rest.user_id,
    };
    req.body = rest;
    next();
  };

  routeByEntityAndID.get(handleGetParticipantsGroup);

  routeByEntity.post(
    excludedBodyMiddleware,
    controllerHandlersObj.createNewValueInDB,
    handleInsertParticipantsGroup
  );

  routeByEntityAndID.put(
    excludedBodyMiddleware,
    controllerHandlersObj.updateValueByID,
    handleInsertParticipantsGroup
  );
  // routeByEntityAndID.delete();

  return expressRouterObj;
};
