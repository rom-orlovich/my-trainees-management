import React from "react";
import { ChartsDataAPI } from "../../../redux/api/interfaceAPI";
import { PropsBasic } from "../baseComponentsTypes";
import Card from "../Card/Card";
import {
  COLORS_CHART,
  dataLabelFormatterByPercents,
  generateRandomColors,
  labelFormatterByPercents,
  PIE_CHART_FONTS,
} from "../Charts/chartsUtils";
import PieChart from "../Charts/PieChart";

function PieChartCard({
  className,
  datasetsValues,
  labelFormatted,
  colors,
  unit,
  chartHeading,
}: PropsBasic &
  Partial<ChartsDataAPI<number[]>> & {
    colors?: (keyof typeof COLORS_CHART)[];
    chartHeading?: string;
    unit?: string;
  }) {
  const labelsArr = labelFormatted || ["No data"];
  const colorsGenerate =
    colors || generateRandomColors(labelsArr.length || 0, 0.7);
  return (
    <Card className={className}>
      <PieChart
        datasets={[
          {
            data: datasetsValues || [100],
            backgroundColor: colorsGenerate,
            borderColor: colorsGenerate,
          },
        ]}
        labels={labelsArr}
        options={{
          plugins: {
            title: {
              display: true,
              text: chartHeading,
              font: { size: 15, lineHeight: 0.1 },
            },
            tooltip: {
              callbacks: {
                label: labelFormatterByPercents,
              },
              position: "average",
              padding: 10,
              bodyFont: {
                size: 18,
              },
            },
            datalabels: {
              formatter:
                unit === "%" ? dataLabelFormatterByPercents : undefined,
              align: "end",
              offset: -20,
              ...PIE_CHART_FONTS,
            },
          },
        }}
      />
    </Card>
  );
}

export default PieChartCard;
