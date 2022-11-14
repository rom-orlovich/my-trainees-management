import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ChartsProps } from "./LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function VerticalBarChart<D, L>({
  datasets,
  labels,
  className,
  options,
}: {
  className?: string;
} & ChartsProps<"bar", D, L>) {
  const data: ChartData<"bar", D[], L> = {
    datasets,
    labels,
  };
  return <Bar className={className} options={options} data={data} />;
}

export default VerticalBarChart;
