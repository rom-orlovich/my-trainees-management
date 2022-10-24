import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  dataLabelFormatterByPercents,
  labelFormatterByPercents,
  PIE_CHART_FONTS,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../../components/baseComponents/Charts/PieChart";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./CaloriesChart.module.scss";

function CaloriesChart({ className }: PropsBasic) {
  const PROTEIN_COLOR = "rgb(240 ,91, 85)";
  const CRABS_COLOR = "rgb(0 ,182, 196)";
  const FATS_COLOR = " rgb(250 ,209 ,55)";
  return (
    <Card className={genClassName(className, style.calories_chart_container)}>
      <PieChart
        className={style.pie_chart}
        datasets={[
          {
            label: "Calories Chart",
            data: [2, 1, 3],
            backgroundColor: [PROTEIN_COLOR, CRABS_COLOR, FATS_COLOR],
            borderColor: [PROTEIN_COLOR, CRABS_COLOR, FATS_COLOR],
          },
        ]}
        labels={["Protein", "Crabs", "Fats"]}
        options={{
          plugins: {
            tooltip: { callbacks: { label: labelFormatterByPercents } },
            datalabels: {
              formatter: dataLabelFormatterByPercents,
              ...PIE_CHART_FONTS,
            },
          },
        }}
      />
    </Card>
  );
}

export default CaloriesChart;
