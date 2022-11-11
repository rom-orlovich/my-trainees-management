import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { traineesApi } from "../../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../../redux/api/interfaceAPI";
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
    <Card className={className}>
      {Data.stats.calStatusHandlesRes?.datasetsValues.map((el) => el)}
    </Card>
  );
}

export default TraineeStatus;
