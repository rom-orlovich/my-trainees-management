/* eslint-disable camelcase */
import React from "react";
import LineChart from "../../../components/baseComponents/Charts/LineChart";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import GraphCard, { GraphFilterByDates } from "../GraphCard";

function TraineeGraphCard(queryOptions: GraphFilterByDates) {
  return (
    <GraphCard queryOptions={queryOptions}>
      {(queryOptionsData) => {
        const { user_id } = useGetUserLoginData();
        const { data, isError, isFetching, isLoading } =
          traineesApi.useGetItemsQuery({
            ...queryOptionsData,
            userID: user_id,
          });
        // const Data = {};
        return <></>;
      }}
    </GraphCard>
  );
}

export default TraineeGraphCard;
