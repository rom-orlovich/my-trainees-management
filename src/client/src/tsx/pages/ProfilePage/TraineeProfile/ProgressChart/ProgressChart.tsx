import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./ProgressChart.module.scss";

function ProgressChart({ className }: PropsBasic) {
  return (
    <Card className={genClassName(className, style.progress_chart_container)}>
      ProgressChart
    </Card>
  );
}

export default ProgressChart;
