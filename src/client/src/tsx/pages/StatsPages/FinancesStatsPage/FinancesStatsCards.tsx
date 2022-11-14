/* eslint-disable camelcase */
import React from "react";
import VerticalBarChartCard from "../../../components/baseComponents/CardCharts/VerticalBarChartCard";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { financesApi } from "../../../redux/api/hooksAPI";
import { CHART_DISPLAY, FinanceAPI } from "../../../redux/api/interfaceAPI";

import FinancePieChartCard from "./FinancePieChartCard";
import StatsPageStyle from "../StatsPages.module.scss";

function FinancesStatsCards({
  queryOptions,
}: {
  queryOptions: { gt: string; lt: string };
}) {
  const { user_id } = useGetUserLoginData();
  const { data } = financesApi.useGetFinancesQuery({
    ...queryOptions,
    userID: user_id,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });
  const Data = data as unknown as FinanceAPI;

  return (
    <>
      <FinancePieChartCard
        datasetsValues={
          Data?.stats?.resultPopularIncomesExpenses?.incomes?.datasetsValues
        }
        pieChartCardProps={{
          chartHeading: "Popular Products",

          labelFormatted:
            Data?.stats?.resultPopularIncomesExpenses?.incomes?.labelFormatted,
        }}
      />
      <FinancePieChartCard
        datasetsValues={
          Data?.stats?.resultPopularIncomesExpenses?.expenses?.datasetsValues
        }
        pieChartCardProps={{
          chartHeading: "Most Expenses",
          labelFormatted:
            Data?.stats?.resultPopularIncomesExpenses?.expenses?.labelFormatted,
        }}
      />
      <FinancePieChartCard
        datasetsValues={
          Data?.stats.mostSpendingCustomers?.incomes?.datasetsValues
        }
        pieChartCardProps={{
          chartHeading: "Trainees expenses",
          labelFormatted:
            Data?.stats.mostSpendingCustomers?.incomes?.labelFormatted,
        }}
      />

      <VerticalBarChartCard
        unit="NIS"
        yTitle="NIS"
        chartHeading={["incomes", "expenses"]}
        getItems={financesApi.useGetFinancesQuery}
        queryOptions={queryOptions}
        className={StatsPageStyle.graph_card_container}
      />
    </>
  );
}

export default FinancesStatsCards;
