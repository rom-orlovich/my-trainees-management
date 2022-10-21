import React from "react";

import {
  eachDayOfInterval,
  parseISO,
  differenceInDays,
  eachWeekOfInterval,
} from "date-fns";
import LineChart from "../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";
import { TrainingProgramExerciseStatsAPI } from "../../redux/api/interfaceAPI";
import { formatDate, genClassName } from "../../utilities/helpersFun";
import style from "./ExerciseStatsChart.module.scss";

export const cal = (data: TrainingProgramExerciseStatsAPI[]) => {
  // const firstDate = data[0].update_date as unknown as string;
  // const lastDate = data[data.length - 1].update_date as unknown as string;
  // console.log(parseISO(firstDate));
  // console.log(parseISO(lastDate));
  // const firstDate = formatDate(data[0].update_date, -1);
  // const lastDate = formatDate(data[data.length - 1].update_date, -1);
  // const options = { start: parseISO(firstDate), end: parseISO(lastDate) };
  // const diff = differenceInDays(parseISO(lastDate), parseISO(firstDate));
  // console.log(eachWeekOfInterval(options));
  // if (diff < 7) return eachDayOfInterval(options);
  // if (diff > 7 && diff < 30) return eachWeekOfInterval(options);
};

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
        console.log(cal(data.data));

        return (
          <LineChart
            className={genClassName(style.chart_exercise)}
            datasets={[
              {
                label: "Weight Progress",
                data: [1, 2],
                backgroundColor: "red",
                borderColor: "red",
              },
            ]}
            labels={["c", "d"]}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default TrainingProgramsExerciseStatsChart;
