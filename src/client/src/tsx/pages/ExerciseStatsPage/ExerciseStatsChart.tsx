import React from "react";

import LineChart from "../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";

import { genClassName } from "../../utilities/helpersFun";
import style from "./ExerciseStatsChart.module.scss";

function TrainingProgramsExerciseStatsChart({
  queriesOptions,
}: {
  queriesOptions?: Record<string, any>;
}) {
  const { data, isError, isFetching, isLoading } =
    trainingProgramsApi.useGetExerciseStatsQuery({
      ...queriesOptions,
    });

  return (
    <LoadingSpinner
      nameData="Data"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => {
        console.log(data);
        return (
          <LineChart
            className={genClassName(style.chart_exercise)}
            datasets={[
              {
                label: "Weight Progress",
                data: data.datasetsValues,
                backgroundColor: "red",
                borderColor: "red",
              },
            ]}
            labels={data.labels}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default TrainingProgramsExerciseStatsChart;
