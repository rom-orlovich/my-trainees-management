import { RequestHandler } from "webpack-dev-server";
import {
  insertQueryOneItem,
  selectQuery,
} from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/constants";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import { IncomeAPI, ProductAPI } from "../CRUDServiceTypes";

export const handleInsertNewSubscription: RequestHandler = async (
  req,
  res,
  next
) => {
  const bodyObj = req.body as IncomeAPI;
  try {
    const product = (
      await selectQuery(
        TABLES_DATA.PRODUCTS_TABLE_NAME,
        "*",
        `where ${TABLES_DATA.PRODUCT_ID}=$1`,
        [bodyObj.product_id]
      )
    )[0] as ProductAPI;

    await insertQueryOneItem(TABLES_DATA.SUBSCRIPTION_PLANS_TABLE_NAME, {
      trainee_id: bodyObj.buyer_id,
      product_id: bodyObj.product_id,
      total_trainings: product.max_training,
      last_training: new Date(),
    });

    return next();
  } catch (error) {
    req.logAlertInfo = createLogAlertInfo("subscriptionPlan")(
      undefined,
      { message: "Subscription plan is not created " },
      "create"
    );
    return next();
  }
};
