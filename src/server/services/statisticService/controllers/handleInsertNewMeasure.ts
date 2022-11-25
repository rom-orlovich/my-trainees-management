/* eslint-disable camelcase */
import { RequestHandler } from "webpack-dev-server";
import { MeasuresRawAPI } from "../serviceStatisticsTypes";

export const handleInsertNewMeasure: RequestHandler = (req, res, next) => {
  const { activity_factor, weight, protein_per_kg, fat_per_kg, fixed_cals } =
    req.body as MeasuresRawAPI;

  const caloriesTotal = activity_factor * weight + (fixed_cals || 0);
  const proteinG = weight * protein_per_kg;
  const fatG = weight * fat_per_kg;
  const proteinCals = weight * protein_per_kg * 4;
  const fatCals = weight * fat_per_kg * 9;
  const crabsCal = caloriesTotal - proteinCals - fatCals;
  const crabsG = (caloriesTotal - proteinCals - fatCals) / 4;

  const result = {
    ...req.body,
    protein_g: proteinG.toFixed(2),
    fat_g: fatG.toFixed(2),
    crabs_g: crabsG.toFixed(2),
    protein_cals: proteinCals.toFixed(2),
    fat_cals: fatCals.toFixed(2),
    crabs_cals: crabsCal.toFixed(2),
    calories_total: caloriesTotal.toFixed(2),
  };

  if (req.query.save === "false") res.status(200).json({ data: result });
  req.body = result;

  return next();
};
