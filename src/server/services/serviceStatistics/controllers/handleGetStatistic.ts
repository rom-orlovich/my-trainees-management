import { RequestHandler } from "webpack-dev-server";
import { promiseHandler } from "../../../utilities/helpers";

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  const exerciseID = req.params.exercise_id;
};
