import { RequestHandler } from "webpack-dev-server";

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.data_for_stats) return next();
  const { statsResult } = req.data_for_stats;
  return res.status(200).json(statsResult);
};
