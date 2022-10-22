import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";

function ProgressChart({ className }: PropsBasic) {
  return <Card className={genClassName(className)}>ProgressChart</Card>;
}

export default ProgressChart;
