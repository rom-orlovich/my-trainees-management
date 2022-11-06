import { RequestHandler } from "webpack-dev-server";
import {
  insertQueryOneItem,
  selectQuery,
} from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/constants";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";

export interface IncomeAPI {
  income_id?: number;
  product_id: number;
  date: Date;
  buyer_id: number;
  amount: number;
  total_price: number;
  note_topic?: string;
  note_text?: string;
  user_id?: number;
}

export interface ProductAPI {
  product_id?: number;
  product_name: string;
  product_type: string;
  max_training?: number;
  price: number;
  user_id?: number;
}

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
