import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartDataset,
  ChartType,
  ChartTypeRegistry,
} from "chart.js";
import { DistributiveArray } from "chart.js/types/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export interface ChartsProps<
  T extends ChartType = ChartType,
  D = DistributiveArray<ChartTypeRegistry[T]>,
  L = string[]
> {
  datasets: ChartDataset<T, D[]>[];
  labels: L[];
  options?: ChartOptions<T>;
}

export const CHART_BASE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
};

export const LINE_CHART_OPTIONS: ChartOptions<"line"> = {
  ...CHART_BASE_OPTIONS,
  plugins: {
    legend: {
      position: "top" as const,
      maxHeight: 100,
    },
  },
};

function LineCharts<D, L>({
  datasets,
  labels,
  className,
}: {
  className?: string;
} & ChartsProps<"line", D, L>) {
  const data: ChartData<"line", D[], L> = {
    datasets,
    labels,
  };
  console.log(data);
  return (
    <Line
      className={className}
      data={data}
      options={LINE_CHART_OPTIONS}
      updateMode="resize"
    />
  );
}

export default LineCharts;
