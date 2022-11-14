/* eslint-disable camelcase */
import React from "react";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { leadsApi, traineesApi } from "../../../redux/api/hooksAPI";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../redux/api/interfaceAPI";
import LineGraphCard from "../LineGraphCard";
import PieChartCard from "../PieChartCard";

import StatsPageStyle from "../StatsPages.module.scss";

function LeadsStatsCards({
  queryOptions,
}: {
  queryOptions: { gt: string; lt: string };
}) {
  const { user_id } = useGetUserLoginData();
  const { data } = leadsApi.useGetItemsQuery({
    ...queryOptions,
    userID: user_id,
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
        unit="Leads"
        chartHeading="New Leads"
        getItems={traineesApi.useGetItemsQuery}
        queryOptions={queryOptions}
        className={StatsPageStyle.graph_card_container}
      />
    </>
  );
}

export default LeadsStatsCards;
