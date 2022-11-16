import React from "react";
import LineGraphCard from "../../../components/baseComponents/CardCharts/LineGraphCard";
import PieChartCard from "../../../components/baseComponents/CardCharts/PieChartCard";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../redux/api/interfaceAPI";

import StatsPageStyle from "../StatsPages.module.scss";

function TraineeStatsCards({
  queryOptions,
}: {
  queryOptions: { gt: string; lt: string };
}) {
  const { user_id } = useGetUserLoginData();
  const queryOptionsData = {
    ...queryOptions,
    userID: user_id,
  };
  const { data } = traineesApi.useGetItemsQuery({
    ...queryOptionsData,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });
  const Data = data as unknown as {
    stats: GetCitiesGendersAgesStatsAPI;
  };

  return (
    <>
      <PieChartCard
        unit="%"
        chartHeading="Cities"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.calStatsCitiesRes?.datasetsValues}
        labelFormatted={Data?.stats?.calStatsCitiesRes?.labelFormatted}
      />
      <PieChartCard
        unit="%"
        chartHeading="Ages"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.agesStatsRes?.datasetsValues}
        labelFormatted={Data?.stats?.agesStatsRes?.labelFormatted}
      />
      <PieChartCard
        unit="%"
        chartHeading="Genders"
        className={StatsPageStyle.distribution_card_container}
        datasetsValues={Data?.stats?.gendersStatsRes?.datasetsValues}
        labelFormatted={Data?.stats?.gendersStatsRes?.labelFormatted}
      />

      <LineGraphCard
        unit="Trainees"
        chartHeading="New Trainees"
        getItems={traineesApi.useGetItemsQuery}
        queryOptions={queryOptionsData}
        className={StatsPageStyle.graph_card_container}
      />
    </>
  );
}

export default TraineeStatsCards;
