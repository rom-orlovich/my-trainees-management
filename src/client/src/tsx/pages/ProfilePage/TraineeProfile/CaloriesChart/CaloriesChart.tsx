import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";

function CaloriesChart({ className }: PropsBasic) {
  return <Card className={genClassName(className)}>CaloriesChart</Card>;
}

export default CaloriesChart;
