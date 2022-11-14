import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import { COLORS_CHART } from "../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../components/baseComponents/Charts/PieChart";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../redux/api/interfaceAPI";
import PieChartCard from "../PieChartCard";

import StatsPageStyle from "../StatsPages.module.scss";
import LineGraphCard from "./TraineeGraphCard";

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
      chartDisplay: CHART_DISPLAY.DISTRIBUTION,
    }
  );
  const Data = data as unknown as {
    stats: GetCitiesGendersAgesStatsAPI;
  };

  return (
    <>
      <PieChartCard
        unit="%"
        chartHeading="Cities"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.calStatsCitiesRes?.datasetsValues || [100]}
        labelFormatted={
          Data?.stats?.calStatsCitiesRes?.labelFormatted || ["No data"]
        }
      />
      <PieChartCard
        unit="%"
        chartHeading="Ages"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.agesStatsRes?.datasetsValues || [100]}
        labelFormatted={
          Data?.stats?.agesStatsRes?.labelFormatted || ["No data"]
        }
      />
      <PieChartCard
        unit="%"
        chartHeading="Genders"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.gendersStatsRes?.datasetsValues || [100]}
        labelFormatted={
          Data?.stats?.gendersStatsRes?.labelFormatted || ["No data"]
        }
      />

      <LineGraphCard
        unit="Trainees"
        chartHeading="New Trainees"
        getItems={traineesApi.useGetItemsQuery}
        queryOptions={queryOptions}
        className={StatsPageStyle.graph_card_container}
      />
    </>
  );
}

export default TraineeStatsCards;
