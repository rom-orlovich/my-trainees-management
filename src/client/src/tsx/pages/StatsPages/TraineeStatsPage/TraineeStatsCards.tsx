import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../redux/api/interfaceAPI";
import StatsPageStyle from "../StatsPages.module.scss";
import TraineeGraphCard from "./TraineeGraphCard";

function TraineeStatsCards({
  queryOptions,
}: {
  queryOptions: { gt: string; lt: string };
}) {
  const { user_id } = useGetUserLoginData();
  const { data, isLoading, isFetching, isError } = traineesApi.useGetItemsQuery(
    {
      ...queryOptions,
      userID: user_id,
      chartDisplay: "all",
    }
  );
  traineesApi.endpoints.getItems.initiate({});
  return (
    <>
      <LoadingSpinner stateData={{ data, isLoading, isFetching, isError }}>
        {(data) => {
          const Data = data as unknown as {
            stats: GetCitiesGendersAgesStatsAPI;
          };
          console.log(Data);
          return (
            <>
              <Card
                className={StatsPageStyle.distribution_card_container}
              ></Card>
              <Card
                className={StatsPageStyle.distribution_card_container}
              ></Card>
              <Card
                className={StatsPageStyle.distribution_card_container}
              ></Card>
            </>
          );
        }}
      </LoadingSpinner>
      <TraineeGraphCard
        queryOptions={queryOptions}
        className={StatsPageStyle.graph_card_container}
      />
    </>
  );
}

export default TraineeStatsCards;
