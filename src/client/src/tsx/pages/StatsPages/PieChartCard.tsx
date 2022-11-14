import React from "react";
import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";
import Card from "../../components/baseComponents/Card/Card";
import {
  COLORS_CHART,
  dataLabelFormatterByPercents,
  generateRandomColors,
  labelFormatterByPercents,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../components/baseComponents/Charts/PieChart";
import { ChartsDataAPI } from "../../redux/api/interfaceAPI";

function PieChartCard({
  className,
  datasetsValues,
  labelFormatted,
  colors,
  unit,
  chartHeading,
}: PropsBasic &
  ChartsDataAPI<number[]> & {
    colors?: (keyof typeof COLORS_CHART)[];
    chartHeading?: string;
    unit?: string;
  }) {
  const colorsGenerate =
    colors || generateRandomColors(labelFormatted.length, 0.7);
  return (
    <Card className={className}>
      <PieChart
        datasets={[
          {
            data: datasetsValues || [],
            backgroundColor: colorsGenerate,
            borderColor: colorsGenerate,
          },
        ]}
        labels={labelFormatted || []}
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
