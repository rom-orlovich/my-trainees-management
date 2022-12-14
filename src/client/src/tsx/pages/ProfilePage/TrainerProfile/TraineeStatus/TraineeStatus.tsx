import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";

import { traineesApi } from "../../../../redux/api/hooksAPI";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../../redux/api/interfaceAPI";
import OverviewProfileCard from "../OverviewProfileCard/OverviewProfileCard";
import { TrainerProfileProps } from "../TrainerProfile";

import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import overviewProfileCardStyle from "../OverviewProfileCard/OverviewProfileCard.module.scss";

function TraineeStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data } = traineesApi.useGetItemsQuery({
    ...queryOptions,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });

  const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

  return (
    <OverviewProfileCard
      heading="Current Trainees"
      StatsLink={{
        statsPagePath: `${APP_ROUTE.STATS_ROUTE}/${APP_ROUTE.TRAINEES_STATS_ROUTE}`,
        text: "Trainee Stats",
      }}
      className={className}
    >
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats.calStatusHandlesRes?.datasetsValues[0]} Trainees
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Active
        </span>
      </div>
      <div className={overviewProfileCardStyle.overview_card_item}>
        <span className={overviewProfileCardStyle.overview_card_item_value}>
          {Data?.stats.calStatusHandlesRes?.datasetsValues[1]} Trainees
        </span>
        <span className={overviewProfileCardStyle.overview_card_item_text}>
          Not Active
        </span>
      </div>
    </OverviewProfileCard>
  );
}

export default TraineeStatus;
