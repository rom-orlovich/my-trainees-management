import { DEVIATION_NUMBER_PERCENTS } from "./constants";

export const handleCreateNutritionQuestionnaire = (defaultMealNum = 3) => {
  // const defaultMealNum =
  //   meals_dist_percents?.length ||
  //   Math.floor(
  //     Math.abs((day_end.getTime() - day_start.getTime()) / 1000 / 3600 / 4)
  //   );
  const remainPercent = 100;
  const avgPercent = 100 / defaultMealNum;
  const t = DEVIATION_NUMBER_PERCENTS + Math.random() * Math.floor(avgPercent);
};
