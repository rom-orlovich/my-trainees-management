import React from "react";

import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";

import LineGraphCard from "../../../../components/baseComponents/CardCharts/LineGraphCard";

import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import { CHART_DISPLAY } from "../../../../redux/api/interfaceAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import style from "./ProgressChart.module.scss";

function ProgressChart({ className }: PropsBasic) {
  const { profileID, userID } = useGetUserTraineeData();
  const queryOptions = {
    profileID,
    userID,
    chartDisplay: CHART_DISPLAY.GRAPH,
    asc: "false",
    numResults: 100,
    gt: "",
    lt: "",
  };

  return (
    <LineGraphCard
      unit="kg"
      useTimeLine={true}
      getItems={measuresApi.useGetItemsQuery}
      chartHeading="Measures Weights Progress"
      queryOptions={queryOptions}
      className={genClassName(className, style.progress_chart_container)}
    />
  );
}

export default ProgressChart;
