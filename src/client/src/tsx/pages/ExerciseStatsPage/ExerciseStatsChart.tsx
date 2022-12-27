import React from "react";
import { useSearchParams } from "react-router-dom";
import LineGraphCard from "../../components/baseComponents/CardCharts/LineGraphCard";

import { trainingProgramsApi } from "../../redux/api/hooksAPI";

import style from "./ExerciseStatsChart.module.scss";

function TrainingProgramsExerciseStatsChart({
  queriesOptions,
}: {
  queriesOptions: Record<string, any>;
}) {
  const [queryParams] = useSearchParams();

  return (
    <LineGraphCard
      className={style.card_exercise_container}
      chartHeading={`${queryParams.get("exercise")}`}
      // lineChartProps={{ className: style.chart_exercise }}
      queryOptions={queriesOptions}
      unit="kg"
      // datesRangeDisplayOption={true}
      timeLineDisplayOption={false}
      getItems={trainingProgramsApi.useGetExerciseStatsQuery}
    />
  );
}

export default TrainingProgramsExerciseStatsChart;
