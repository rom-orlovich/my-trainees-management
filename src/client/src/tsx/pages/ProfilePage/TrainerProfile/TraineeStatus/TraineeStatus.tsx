import { Stats } from "fs";
import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { traineesApi } from "../../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../../redux/api/interfaceAPI";
import OverviewProfileCard from "../OverviewProfileCard/OverviewProfileCard";
import { TrainerProfileProps } from "../TrainerProfile";

function TraineeStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data, status, isFetching, isError } = traineesApi.useGetItemsQuery({
    ...queryOptions,
    displayStats: "distribution",
  });

  const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

  return (
    <OverviewProfileCard
      heading="CurrentTrainees"
      StatsLink={{ statsPagePath: "", text: "Trainee Stats" }}
      className={className}
    >
      <div>
        <h3>Active:</h3>
        <div>{Data?.stats.calStatusHandlesRes?.datasetsValues[0]} Trainees</div>
      </div>
      <div>
        <h3>Not Active:</h3>
        <div>{Data?.stats.calStatusHandlesRes?.datasetsValues[1]} Trainees</div>
      </div>
    </OverviewProfileCard>
  );
}

export default TraineeStatus;
