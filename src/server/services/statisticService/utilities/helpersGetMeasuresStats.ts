import { GenericRecord } from "../../../utilities/types";
import { logger } from "../../loggerService/logger";
import {
  ChartTypes,
  CHART_DISPLAY,
  MeasuresCalResAPI,
  TimeLineDisplay,
} from "../serviceStatisticsTypes";
import { normalizeDatesValuesSumObj } from "./helpersGetAgesCitiesGenderTimeLinesStats";

import {
  calAllTimeLineObj,
  createTimeLineObj,
  getResultGraphStats,
} from "./helpersGetStats";

// export const normalizeDatesValuesSumObj = (
//   sumObj: GenericRecord<{ weight: number }>
// ) => {
//   const { datasetsValues, labelFormatted } = createLabelDatasetFromObj(sumObj);
//   const values = datasetsValues.map((objValues) => objValues.weight);
//   return {
//     labelFormatted,
//     datasetsValues: values,
//   };
// };

export const measuresChartLineCreateLabelAndDatasets = (
  measuresCalData: MeasuresCalResAPI[],
  timeLineDisplay?: TimeLineDisplay,
  dateStart?: string
) => {
  const statsArr = measuresCalData
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((el) => ({
      date: el.date,
      value: el.weight,
    }));

  let objAllTimeLine = createTimeLineObj(
    {} as GenericRecord<{ measure: number }>,
    timeLineDisplay,
    "graph",
    dateStart
  );

  statsArr.forEach((el) => {
    objAllTimeLine = calAllTimeLineObj(
      el.date,
      "measure",
      objAllTimeLine,
      undefined,
      el.value
    );
  });

  return getResultGraphStats(objAllTimeLine, (timeLineObj) =>
    normalizeDatesValuesSumObj(timeLineObj, "measure")
  );
};

export const caloriesChartCreateLabelAndDatasets = (
  measuresCalData: MeasuresCalResAPI
) => {
  const labels = ["Protein", "Fats", "Carbs"];

  return {
    weightsDisplay: {
      labelFormatted: labels,
      datasetsValues: [
        measuresCalData.protein_g,
        measuresCalData.fat_g,
        measuresCalData.carbs_g,
      ],
    },
    caloriesDisplay: {
      labelFormatted: labels,
      datasetsValues: [
        measuresCalData.protein_cals,
        measuresCalData.fat_cals,
        measuresCalData.carbs_cals,
      ],
    },
    calories_total: measuresCalData.calories_total,
  };
};

export const getMeasuresStats = (
  measuresData: MeasuresCalResAPI[],
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay
) => {
  let result = {};
  if (chartDisplay) {
    if (chartDisplay === CHART_DISPLAY.DISTRIBUTION) {
      const lastResult = measuresData[0];
      logger.debug(`LINE 58:`, { __filename, objs: measuresData });
      result = {
        caloriesChart: caloriesChartCreateLabelAndDatasets(lastResult),
      };
    } else if (chartDisplay === CHART_DISPLAY.GRAPH)
      result = {
        graphStats: measuresChartLineCreateLabelAndDatasets(
          measuresData,
          timeLineDisplay
        ),
      };
  }

  return result;
};
