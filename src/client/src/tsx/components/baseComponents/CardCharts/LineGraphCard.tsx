import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import ChartCard from "./ChartCard/ChartCard";
import {
  CHART_DISPLAY,
  GetCitiesGendersAgesStatsAPI,
} from "../../../redux/api/interfaceAPI";
import { GenericRecord } from "../../../types";
import {
  CHART_BASE_OPTIONS,
  generateRandomColor,
  labelFormatterByUnit,
} from "../Charts/chartsUtils";
import LineChart from "../Charts/LineChart";
import { GraphFilterByDates } from "../baseComponentsTypes";

function LineGraphCard({
  queryOptions,
  className,
  getItems,
  chartHeading,
  unit,
  color,
  lineChartProps,
  timeLineDisplayOption = true,
  datesRangeDisplayOption = false,
}: {
  chartHeading: string;
  unit?: string;
  className?: string;
  queryOptions: Partial<GraphFilterByDates> & GenericRecord<any>;
  getItems: UseQuery<any>;
  color?: string;
  lineChartProps?: { className: string };
  timeLineDisplayOption?: boolean;
  datesRangeDisplayOption?: boolean;
}) {
  return (
    <ChartCard
      queryOptions={queryOptions}
      className={className}
      timeLineDisplayOption={timeLineDisplayOption}
      datesRangeDisplayOption={datesRangeDisplayOption}
    >
      {(queryOptionsData) => {
        const { data } = getItems({
          ...queryOptionsData,
          chartDisplay: CHART_DISPLAY.GRAPH,
        });

        const Data = data as unknown as { stats: GetCitiesGendersAgesStatsAPI };
        const defaultColors =
          color ||
          (Data?.stats.graphStats?.labelFormatted && generateRandomColor(0.5));
        return (
          <LineChart
            className={lineChartProps?.className}
            options={{
              ...CHART_BASE_OPTIONS,
              scales: {
                y: {
                  beginAtZero: true,
                },
                x: {
                  ticks: {
                    font: {
                      size: 10,
                    },
                  },
                },
              },
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
                pointRadius: 5,
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
    </ChartCard>
  );
}

export default LineGraphCard;
