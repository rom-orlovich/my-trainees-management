import React from "react";

import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";

import { leadsApi } from "../../../../redux/api/hooksAPI";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes2/appRoutesConstants";
import OverviewProfileCard from "../OverviewProfileCard/OverviewProfileCard";

import { TrainerProfileProps } from "../TrainerProfile";
import overviewProfileCardStyle from "../OverviewProfileCard/OverviewProfileCard.module.scss";

function LeadsStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data } = leadsApi.useGetItemsQuery({
    ...queryOptions,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });

  const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

  return (
    <OverviewProfileCard
      heading="Leads Status"
      StatsLink={{
        statsPagePath: `${APP_ROUTE.STATS_ROUTE}/${APP_ROUTE.LEADS_STATS_ROUTE}`,
        text: "Leads Stats",
      }}
      className={className}
    >
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats.calStatusHandlesRes?.datasetsValues[0]} Leads
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Handle
        </span>
      </div>
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats.calStatusHandlesRes?.datasetsValues[1]} Leads
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Not Handle
        </span>
      </div>
    </OverviewProfileCard>
  );
}

export default LeadsStatus;
