import { ChartTypeRegistry, TooltipItem } from "chart.js";
import { Context } from "vm";

export const labelFormatterByUnit =
  <T extends keyof ChartTypeRegistry>(unit?: string) =>
  (value: TooltipItem<T>) =>
    `${value.label}${value.parsed}${unit || ""}`;

export const labelFormatterByPercents = <T extends keyof ChartTypeRegistry>(
  ctx: TooltipItem<T>
) => {
  // const values = value.chart.data.datasets[0] as number[];
  const values = ctx.chart.data.datasets[0].data as unknown as number[];
  const sum = values.reduce((pre, cur) => pre + cur, 0);
  const val = ctx.parsed as number;
  return `${ctx.label} ${((val / sum) * 100).toFixed(1)}%`;
};

export const dataLabelFormatterByPercents = (value: any, ctx: Context) => {
  const values = ctx.dataset.data as number[];
  const sum = values.reduce((pre, cur) => pre + cur, 0);
  return `${((value / sum) * 100).toFixed(1)}%`;
};
export const dataLabelFormatterByUnit =
  (unit?: string) => (value: any, ctx: Context) =>
    `${value}${unit || ""}`;

export const PIE_CHART_FONTS = {
  color: "white",
  font: {
    size: 15,
    weight: 400,
  },
};
