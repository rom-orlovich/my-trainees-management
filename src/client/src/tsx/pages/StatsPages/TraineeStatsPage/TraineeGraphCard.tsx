/* eslint-disable camelcase */
import React from "react";
import LineChart from "../../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../redux/api/interfaceAPI";
import GraphCard, { GraphFilterByDates } from "../GraphCard";

function TraineeGraphCard({
  queryOptions,
  className,
}: {
  className: string;
  queryOptions: GraphFilterByDates;
}) {
  return (
    <GraphCard queryOptions={queryOptions} className={className}>
      {(queryOptionsData) => {
        const { user_id } = useGetUserLoginData();
        const { data, isError, isFetching, isLoading } =
          traineesApi.useGetItemsQuery({
            ...queryOptionsData,
            userID: user_id,
            chartDisplay: "graph",
          });
        const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

        return (
          <LineChart
            datasets={[
              {
                label: `Measures Weights Progress`,
                backgroundColor: "red",
                borderColor: "red",
                data: Data?.stats.graphStats?.datasetsValues || [],
              },
            ]}
            labels={Data?.stats.graphStats?.labelFormatted || []}
          />
        );
      }}
    </GraphCard>
  );
}

export default TraineeGraphCard;
