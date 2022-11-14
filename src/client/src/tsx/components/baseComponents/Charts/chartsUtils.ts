/* eslint-disable no-unused-vars */
import { ChartTypeRegistry, TooltipItem } from "chart.js";
import { Context } from "vm";

export const labelFormatterByUnit =
  <T extends keyof ChartTypeRegistry>(unit?: string) =>
  (value: TooltipItem<T>) =>
    `${value.label} ${
      unit === "g" || unit === "Kcal" || unit === "NIS" ? "" : ", "
    }${value.raw} ${unit || ""}`;

export const labelFormatterByPercents = <T extends keyof ChartTypeRegistry>(
  ctx: TooltipItem<T>
) => {
  // const values = value.chart.data.datasets[0] as number[];
  const values = ctx.chart.data.datasets[0].data as unknown as number[];
  const sum = values.reduce((pre, cur) => pre + cur, 0);
  const val = ctx.parsed as number;
  return `${ctx.label}, ${((val / sum) * 100).toFixed(1)}%`;
};

export const dataLabelFormatterByPercents = (value: any, ctx: Context) => {
  const values = ctx.dataset.data as number[];
  const sum = values.reduce((pre, cur) => pre + cur, 0);
  return `${((value / sum) * 100).toFixed(1)}%`;
};
export const dataLabelFormatterByUnit =
  (unit?: string) => (value: any, ctx: Context) =>
    `${value} ${unit === "g" || unit === "Kcal" || unit === "NIS" ? "" : ", "}${
      unit || ""
    }`;

export enum COLORS_CHART {
  RED = "#EC1515",
  BLUE = "rgb(0 ,182, 196)",
  YELLOW = " rgb(250 ,209 ,55)",
  GREEN = "#29E959",
}
export const PIE_CHART_FONTS = {
  color: "rgb(59, 71, 66)",
  font: {
    size: window.innerWidth < 500 ? 22 : 15,
    weight: 500,
  },
};
export const DOUGHNUT_CHART_FONTS = {
  color: "rgb(59, 71, 66)",
  font: {
    size: window.innerWidth < 500 ? 20 : 16,
    weight: 400,
  },
};

export const generateRandomColorNum = () =>
  Math.floor(Math.random() * (235 - 52 + 1) + 52);
export const generateRandomColor = (opacity = 1) => {
  const r = generateRandomColorNum();
  const g = generateRandomColorNum();
  const b = generateRandomColorNum();
  return `rgba(${r},${g},${b},${opacity})`;
};

export const generateRandomColors = (labelLength: number, opacity = 1) => {
  const colors = [];
  for (let i = 0; i < labelLength; i++) {
    colors.push(generateRandomColor(0.5));
  }
  return colors;
};
