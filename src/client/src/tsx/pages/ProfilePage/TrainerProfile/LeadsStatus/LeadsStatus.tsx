import React from "react";

import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";

import { leadsApi } from "../../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../../redux/api/interfaceAPI";

import { TrainerProfileProps } from "../TrainerProfile";

function LeadsStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data, isError, isFetching, isLoading } = leadsApi.useGetItemsQuery({
    ...queryOptions,
    chartDisplay: "distribution",
  });
  const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

  return (
    <Card className={className}>
      <div>
        <h2>Handle</h2>
        {Data?.stats.calStatusHandlesRes?.datasetsValues[0]}
      </div>
      <div>
        <h2>Not Handle:</h2>
        <div> {Data?.stats.calStatusHandlesRes?.datasetsValues[1]}</div>
      </div>
    </Card>
  );
}

export default LeadsStatus;
