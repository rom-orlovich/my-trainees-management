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
    routeByEntity,
    routeByEntityAndID,
  } = createControllersHandlerAndRouterWithAppMiddleware(traineesOptionsCRUD);
  routeByEntity.post(handleRegisterTrainee);
  routeByEntityAndID.put(updateValueByID);
  return expressRouterObj;
};

export const createAlertsRouter = () => {
  const alertRoute = createCRUDroutes(alertsOptionsCRUD);
  alertRoute.delete("", handleDeleteAllUserAlerts);
  return alertRoute;
};

export const createIncomesRouter = () => {
  const { routeByEntity, controllerHandlersObj, expressRouterObj } =
    createControllersHandlerAndRouterWithAppMiddleware(incomesOptionsCRUD);
  routeByEntity.post(handleInsertNewSubscription);
  routeByEntity.put(controllerHandlersObj.updateValueByID);

  return expressRouterObj;
};
