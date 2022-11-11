import React from "react";
import { useSearchParams } from "react-router-dom";

import LineChart from "../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";

import { genClassName } from "../../utilities/helpersFun";
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

  return (
    <LoadingSpinner
      nameData="Data"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => (
        <LineChart
          className={genClassName(style.chart_exercise)}
          datasets={[
            {
              label: `${queryParams.get("exercise")}`,
              data: data.stats.datasetsValues,
              backgroundColor: "red",
              borderColor: "red",
            },
          ]}
          labels={data.stats.labelFormatted}
        />
      )}
    </LoadingSpinner>
  );
}

export default TrainingProgramsExerciseStatsChart;
