import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React from "react";
import ChartCard from "./ChartCard/ChartCard";
import { CHART_DISPLAY, FinanceAPI } from "../../../redux/api/interfaceAPI";
import { GenericRecord } from "../../../types";
import {
  CHART_BASE_OPTIONS,
  generateRandomColors,
  labelFormatterByUnit,
} from "../Charts/chartsUtils";

import VerticalBarChart from "../Charts/VerticalChart";
import { GraphFilterByDates } from "../baseComponentsTypes";

function VerticalBarChartCard({
  queryOptions,
  className,
  getItems,
  chartHeading,
  unit,
  yTitle,
  lineChartProps,
  timeLineDisplayOption = true,
}: {
  yTitle: string;
  chartHeading: string[];
  unit?: string;
  className?: string;
  queryOptions: Partial<GraphFilterByDates> & GenericRecord<any>;
  getItems: UseQuery<any>;
  color?: string;
  lineChartProps?: { className: string };
  timeLineDisplayOption?: boolean;
}) {
  return (
    <ChartCard
      queryOptions={queryOptions}
      className={className}
      timeLineDisplayOption={timeLineDisplayOption}
    >
      {(queryOptionsData) => {
        const { data } = getItems({
          ...queryOptionsData,
          chartDisplay: CHART_DISPLAY.GRAPH,
        });

        const Data = data as unknown as FinanceAPI;
        const graphStats = Data?.stats.graphStats;
        const defaultColors = (Data?.stats.graphStats &&
          generateRandomColors(2, 0.7)) || [generateRandomColors(2, 0.7)];
        const [firstColor, secColor] = defaultColors;
        return (
          <VerticalBarChart
            className={lineChartProps?.className}
            options={{
              ...CHART_BASE_OPTIONS,
              scales: { y: { title: { display: true, text: yTitle } } },
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
                borderRadius: 5,
                backgroundColor: firstColor,
                borderColor: firstColor,
                label: chartHeading[0],
                data: graphStats?.datasetsValues?.incomes || [],
              },
              {
                borderRadius: 5,
                backgroundColor: secColor,
                borderColor: secColor,
                label: chartHeading[1],
                data: graphStats?.datasetsValues?.expenses || [],
              },
            ]}
            labels={graphStats?.labelFormatted || []}
          />
        );
      }}
    </ChartCard>
  );
}

export default VerticalBarChartCard;
