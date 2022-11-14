/* eslint-disable camelcase */
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React from "react";
import {
  COLORS_CHART,
  dataLabelFormatterByUnit,
  generateRandomColor,
  generateRandomColors,
  labelFormatterByUnit,
} from "../../../components/baseComponents/Charts/chartsUtils";
import LineChart from "../../../components/baseComponents/Charts/LineChart";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../redux/api/interfaceAPI";
import GraphCard, { GraphFilterByDates } from "../GraphCard";

function LineGraphCard({
  queryOptions,
  className,
  getItems,
  chartHeading,
  unit,
  color,
}: {
  chartHeading: string;
  unit?: string;
  className: string;
  queryOptions: GraphFilterByDates;
  getItems: UseQuery<any>;
  color?: string;
}) {
  return (
    <GraphCard queryOptions={queryOptions} className={className}>
      {(queryOptionsData) => {
        const { user_id } = useGetUserLoginData();

        const { data } = getItems({
          ...queryOptionsData,
          userID: user_id,
          chartDisplay: CHART_DISPLAY.GRAPH,
        });

        const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };
        const defaultColors =
          color ||
          (Data?.stats.graphStats?.labelFormatted && generateRandomColor(0.5));
        return (
          <LineChart
            options={{
              plugins: {
                tooltip: {
                  callbacks: { label: labelFormatterByUnit(unit) },
                  position: "average",
                  padding: 10,
                  bodyFont: {
                    size: 12,
                  },
                },
                datalabels: {
                  formatter: () => "",
                },
              },
            }}
            datasets={[
              {
                backgroundColor: defaultColors,
                borderColor: defaultColors,
                pointBorderColor: defaultColors,
                pointBackgroundColor: defaultColors,
                pointRadius: 4,
                pointStyle: "circle",
                tension: 0.5,
                label: chartHeading,
                data: Data?.stats.graphStats?.datasetsValues || [],
              },
            ]}
            labels={Data?.stats.graphStats?.labelFormatted || []}
          />
        );
      }}
    </GraphCard>
  );
}

export default LineGraphCard;
