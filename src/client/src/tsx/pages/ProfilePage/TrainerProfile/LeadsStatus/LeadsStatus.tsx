import React from "react";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  COLORS_CHART,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../../components/baseComponents/Charts/PieChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { leadsApi } from "../../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { TrainerProfileProps } from "../TrainerProfile";
import style from "../../ChartProfileStyle/ChartProfileStyle.module.scss";
import { genClassName } from "../../../../utilities/helpersFun";

function LeadsStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data, isError, isFetching, isLoading } = leadsApi.useGetItemsQuery({
    ...queryOptions,
    timeLineDisplay: "distribution",
  });
  const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };

  return (
    <Card className={className}>
      <div>
        <h2>Handle</h2>
        {Data?.stats.calStatusHandlesRes?.datasetsValues[0]}
      </div>
      <div>
        <h2>Not Handle:</h2>
        <div> {Data?.stats.calStatusHandlesRes?.datasetsValues[1]}</div>
      </div>
    </Card>
  );
}

export default LeadsStatus;
