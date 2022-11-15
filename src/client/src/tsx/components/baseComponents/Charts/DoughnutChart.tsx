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
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { ChartsProps } from "./LineChart";
import {
  CHART_BASE_OPTIONS,
  dataLabelFormatterByPercents,
  DOUGHNUT_CHART_FONTS,
  labelFormatterByUnit,
} from "./chartsUtils";

const pluginCenter: Plugin<"doughnut"> = {
  id: "center",
  beforeDraw(chart) {
    if (chart.options.plugins?.pluginCenter) {
      const { fontSize: fontSizeP, textCenter } =
        chart.options.plugins.pluginCenter;
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;

      ctx.restore();
      const fontSize = (height / 150).toFixed(2);
      ctx.font = `${fontSizeP || fontSize}rem sans-serif`;
      ctx.textBaseline = "middle";

      const text = textCenter || "";
      const textSize = ctx.measureText(text);

      const k =
        textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent;
      const t =
        textSize.fontBoundingBoxAscent + textSize.fontBoundingBoxDescent;
      const textX = Math.round((width - textSize.width) / 2);
      const textY = height / 2 + t;

      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  },
};

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, pluginCenter);

export const DOUGHNUT_CHART_OPTIONS: ChartOptions<"doughnut"> = {
  ...CHART_BASE_OPTIONS,
  plugins: {
    title: {
      display: true,
      text: "Custom Chart Title",
      position: "bottom",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: labelFormatterByUnit("g"),
      },
    },
    datalabels: {
      formatter: dataLabelFormatterByPercents,
      ...DOUGHNUT_CHART_FONTS,
    },
  },
};

function DoughnutChart<D, L>({
  datasets,
  labels,
  className,
  options,
}: {
  className?: string;
} & ChartsProps<"doughnut", D, L>) {
  const data: ChartData<"doughnut", D[], L> = {
    datasets,
    labels,
  };
  return (
    <Doughnut
      className={className}
      data={data}
      options={{
        ...DOUGHNUT_CHART_OPTIONS,
        ...options,
      }}
    />
  );
}

export default DoughnutChart;
