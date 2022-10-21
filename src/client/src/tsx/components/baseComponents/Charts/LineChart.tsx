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
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      maxHeight: 100,
    },
  },

  maintainAspectRatio: false,
};

function LineCharts<D, L>({
  datasets,
  labels,
  className,
}: {
  datasets: ChartDataset<"line", D[]>[];
  labels: L[];
  className?: string;
}) {
  const data: ChartData<"line", D[], L> = {
    datasets: [...datasets],
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

export default LineCharts;
