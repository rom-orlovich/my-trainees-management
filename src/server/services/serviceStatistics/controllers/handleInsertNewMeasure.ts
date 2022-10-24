/* eslint-disable camelcase */
import { RequestHandler } from "webpack-dev-server";

export interface MeasuresAPI {
  measure_id?: number;
  date: Date;
  weight: number;
  height: number;
  activity_factor: number;
  fat_percents?: number;
  protein_per_kg: number;
  fat_per_kg: number;
  fixed_cals?: number;
}
export const handleInsertNewMeasure: RequestHandler = (req, res, next) => {
  const {
    activity_factor,
    weight,
    protein_per_kg,
    fat_per_kg,
    fixed_cals,
    ...rest
  } = req.body as MeasuresAPI;

  const caloriesTotal = activity_factor * weight + (fixed_cals || 0);
  const proteinG = weight * protein_per_kg;
  const fatG = weight * fat_per_kg;
  const proteinCals = weight * protein_per_kg * 4;
  const fatCals = weight * fat_per_kg * 9;
  const crabsCal = caloriesTotal - proteinCals - fatCals;
  const crabsG = (caloriesTotal - proteinCals - fatCals) / 4;

  const result = {
    ...rest,
    protein_g: proteinG,
    fat_g: fatG,
    crabs_g: crabsG,
    protein_cals: proteinCals,
    fat_cals: fatCals,
    crabs_cals: crabsCal,
    calories_total: caloriesTotal,
  };
  if (req.query.save === "false") res.status(200).json({ data: result });

  req.statsData = {
    newMeasureRes: result,
  };

  return next();
};
