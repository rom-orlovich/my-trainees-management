import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React from "react";
import GraphCard, {
  GraphFilterByDates,
} from "../../../pages/StatsPages/GraphCard";
import { CHART_DISPLAY, FinanceAPI } from "../../../redux/api/interfaceAPI";
import { GenericRecord } from "../../../types";
import {
  generateRandomColors,
  labelFormatterByUnit,
} from "../Charts/chartsUtils";
import VerticalBarChart from "../Charts/VerticalChart";

function VerticalBarChartCard({
  queryOptions,
  className,
  getItems,
  chartHeading,
  unit,
  yTitle,
  lineChartProps,
  useTimeLine = true,
}: {
  yTitle: string;
  chartHeading: string[];
  unit?: string;
  className?: string;
  queryOptions: Partial<GraphFilterByDates> & GenericRecord<any>;
  getItems: UseQuery<any>;
  color?: string;
  lineChartProps?: { className: string };
  useTimeLine?: boolean;
}) {
  return (
    <GraphCard
      queryOptions={queryOptions}
      className={className}
      useTimeLine={useTimeLine}
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
    </GraphCard>
  );
}

export default VerticalBarChartCard;
