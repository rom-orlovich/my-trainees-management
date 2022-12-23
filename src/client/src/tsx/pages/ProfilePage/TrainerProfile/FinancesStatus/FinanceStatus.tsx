import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";

import { financesApi } from "../../../../redux/api/hooksAPI";
import { CHART_DISPLAY, FinanceAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import OverviewProfileCard from "../OverviewProfileCard/OverviewProfileCard";
import { TrainerProfileProps } from "../TrainerProfile";
import overviewProfileCardStyle from "../OverviewProfileCard/OverviewProfileCard.module.scss";

function FinancesStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data } = financesApi.useGetFinancesQuery({
    ...queryOptions,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });

  const Data = data as unknown as FinanceAPI;

  return (
    <OverviewProfileCard
      heading="Finances Status"
      StatsLink={{
        statsPagePath: `${APP_ROUTE.STATS_ROUTE}/${APP_ROUTE.FINANCES_STATS_ROUTE}`,
        text: "Finances Stats",
      }}
      className={className}
    >
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats?.totalFinancesSum.incomes} NIS
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Incomes
        </span>
      </div>
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats?.totalFinancesSum.expenses} NIS
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Expenses
        </span>
      </div>
    </OverviewProfileCard>
  );
}

export default FinancesStatus;
