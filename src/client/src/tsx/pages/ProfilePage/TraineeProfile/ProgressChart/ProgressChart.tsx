import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import LineGraphCard from "../../../../components/baseComponents/CardCharts/LineGraphCard";
import {
  dataLabelFormatterByUnit,
  generateRandomColor,
  generateRandomColorNum,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import LineChart, {
  LINE_CHART_OPTIONS,
} from "../../../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import {
  ChartsDataAPI,
  CHART_DISPLAY,
  MeasuresCalResAPI,
  ResponseQueryAPI,
} from "../../../../redux/api/interfaceAPI";

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
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    {
      profileID,
      userID,
      chartDisplay: CHART_DISPLAY.GRAPH,
      asc: "false",
      numResults: 100,
    }
  );
  const Data = data as ResponseQueryAPI<MeasuresCalResAPI> & {
    stats: { graphStats: ChartsDataAPI<number[]> };
  };
  return (
    <LineGraphCard
      unit="kg"
      useTimeLine={false}
      getItems={measuresApi.useGetItemsQuery}
      chartHeading="Measures Weights Progress"
      queryOptions={queryOptions}
      className={genClassName(className, style.progress_chart_container)}
    />
  );
}

export default ProgressChart;
