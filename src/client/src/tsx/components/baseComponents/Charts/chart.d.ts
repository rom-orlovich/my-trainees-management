import { ChartType, Plugin } from "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    pluginCenter?: {
      // Key is the pluginId
      textCenter: string;
      fontSize: string;
    };
  }
}
