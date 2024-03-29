/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { RequestHandler } from "express";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { API_ROUTES } from "../../apiRoutesConstants";

import { handleDeleteAllUserAlerts } from "../../alertsService/handleAlerts";
import { handleRegisterTrainee } from "../../authService/controllers/handleRegisterTrainee";
import { handleGetFinanceStats } from "../../statisticService/controllers/handleGetFinanceStats";
import { handleGetStatistic } from "../../statisticService/controllers/handleGetStatistic";
import { handleInsertNewMeasure } from "../../statisticService/controllers/handleInsertNewMeasure";

import { handleInsertNewSubscription } from "../controllers/handleInsertNewSubscription";

import {
  createBaseRouterControllerWithAuthMiddleware,
  createControllersHandlerAndRoutes,
} from "../utilities/helperServiceCRUD";
import {
  alertsOptionsCRUD,
  financesStatsOptionsCRUD,
  incomesOptionsCRUD,
  measuresOptionsCRUD,
  meetingOptionsCRUD,
  nutritionMenuOptionsCRUD,
  nutritionQuestionnaireCRUD,
  traineesOptionsCRUD,
} from "./configRoutes";
import { createCRUDroutes } from "./createCRUDroutes";
import { handleGenerateNutritionMenu } from "../../nutritionMenuService/controllers/handleGenerateNutritionMenu";
import { handleGetNutritionMenu } from "../../nutritionMenuService/controllers/handleGetNutritionMenu";
import { handleCreateNutritionQuestionnaire } from "../../nutritionMenuService/controllers/helpersCreateNutritionQuestionnaire";

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
    createBaseRouterControllerWithAuthMiddleware(financesStatsOptionsCRUD);
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
  } = createControllersHandlerAndRoutes(meetingOptionsCRUD, {
    get: true,
    post: true,
    put: true,
    deleteByID: true,
  });

  const getMeetingTraineeHandler: RequestHandler = (req, res, next) => {
    // Enabling trainees to access their meetings.
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
    // controllerHandlersObj.validateMiddlewareHandler,
    controllerHandlersObj.createNewValueInDB
  );
  routeByEntityAndID.put(
    // controllerHandlersObj.validateMiddlewareHandler,
    controllerHandlersObj.updateValueByID
  );

  return expressRouterObj;
};

export const createNutritionMenuRouter = () => {
  const nutritionMenuRouter = createCRUDroutes(nutritionMenuOptionsCRUD, {
    getByID: true,
  });

  nutritionMenuRouter.get(`/generateMenu/:id`, handleGenerateNutritionMenu);
  nutritionMenuRouter.get(
    `/${API_ROUTES.NUTRITION_MENU_ENTITY}/:id`,
    handleGetNutritionMenu
  );

  return nutritionMenuRouter;
};

export const createNutritionQuestionnaireRouter = () => {
  const nutritionQuestionnaireRouter = createCRUDroutes(
    nutritionQuestionnaireCRUD,
    {
      post: true,
      put: true,
    }
  );

  nutritionQuestionnaireRouter.post(
    `/${API_ROUTES.NUTRITION_QUESTIONNAIRE_ENTITY}`,
    handleCreateNutritionQuestionnaire
  );
  return nutritionQuestionnaireRouter;
};
