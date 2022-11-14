import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { ChartsProps, CHART_BASE_OPTIONS } from "./LineChart";
import {
  dataLabelFormatterByPercents,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "./chartsUtils";

// const plugin1: Plugin<"pie"> = {
//   id: "s",
//   afterLayout(chart) {
//     chart?.legend?.legendItems?.map((label) => {
//       label.text = label.text.slice(0, 5);
//       return label;
//     });
//   },
// };
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const PIE_CHART_OPTIONS: ChartOptions<"pie"> = {
  ...CHART_BASE_OPTIONS,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: labelFormatterByUnit("g"),
      },
    },
    datalabels: {
      formatter: dataLabelFormatterByPercents,

      ...PIE_CHART_FONTS,
    },
  },
};

function PieChart<D, L>({
  datasets,
  labels,
  className,
  options,
}: {
  className?: string;
} & ChartsProps<"pie", D, L>) {
  const data: ChartData<"pie", D[], L> = {
    datasets,
    labels,
  };
  return (
    <Pie
      style={{ padding: "0.5rem" }}
      className={className}
      data={data}
      options={{ ...PIE_CHART_OPTIONS, ...options }}
    />
  );
}

export default PieChart;
