import React from "react";
import { useSearchParams } from "react-router-dom";
import LineGraphCard from "../../components/baseComponents/CardCharts/LineGraphCard";

import { trainingProgramsApi } from "../../redux/api/hooksAPI";

import style from "./ExerciseStatsChart.module.scss";

function TrainingProgramsExerciseStatsChart({
  queriesOptions,
}: {
  queriesOptions?: Record<string, any>;
}) {
  const [queryParams] = useSearchParams();
  const { data, isError, isFetching, isLoading } =
    trainingProgramsApi.useGetExerciseStatsQuery({
      ...queriesOptions,
    });
  const options = { ...queriesOptions };

  // return (
  //   <LineChart
  //     className={genClassName(style.chart_exercise)}
  //     datasets={[
  //       {
  //         label: `${queryParams.get("exercise")}`,
  //         data: data?.stats?.graphStats?.datasetsValues || [],
  //         backgroundColor: "red",
  //         borderColor: "red",
  //       },
  //     ]}
  //     labels={data?.stats?.graphStats?.labelFormatted || []}
  //   />
  // );
  return (
    <LineGraphCard
      className={style.card_exercise_container}
      chartHeading={`${queryParams.get("exercise")}`}
      // className={style.chart_exercise}
      lineChartProps={{ className: style.chart_exercise }}
      queryOptions={options}
      unit="kg"
      useTimeLine={false}
      getItems={trainingProgramsApi.useGetExerciseStatsQuery}
    />
  );
}

export default TrainingProgramsExerciseStatsChart;
