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
import { labelFormatterByUnit } from "./chartsUtils";

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



function LineChart<D, L>({
  datasets,
  labels,
  className,
  options,
}: {
  className?: string;
} & ChartsProps<"line", D, L>) {
  const data: ChartData<"line", D[], L> = {
    datasets,
    labels,
  };

  return (
    <Line
      className={className}
      data={data}
      options={options}
      updateMode="resize"
    />
  );
}

export default LineChart;
