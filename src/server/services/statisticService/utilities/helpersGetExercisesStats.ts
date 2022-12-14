import { ExerciseStatsAPI, TimeLineDisplay } from "../serviceStatisticsTypes";
import { normalizeDatesValues } from "./helpersGetStats";

export const exerciseStatsCreateLabelAndDatasets = (
  exerciseStatsAPI: ExerciseStatsAPI[],
  timeLineDisplay?: TimeLineDisplay
) => {
  const statsArr = exerciseStatsAPI
    .sort((a, b) => a.update_date.getTime() - b.update_date.getTime())
    .map((el) => ({
      date: el.update_date,
      value: el.intensity,
    }));

  return normalizeDatesValues(statsArr);
};
