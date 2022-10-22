import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";

function SubscriptionPlan({ className }: PropsBasic) {
  return <Card className={genClassName(className)}>SubscriptionPlan</Card>;
}

export default SubscriptionPlan;
