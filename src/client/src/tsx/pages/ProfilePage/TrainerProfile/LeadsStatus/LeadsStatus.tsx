import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { leadsApi } from "../../../../redux/api/hooksAPI";
import { TrainerProfileProps } from "../TrainerProfile";

function LeadsStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  leadsApi.useGetItemsQuery({ ...queryOptions, displayStats: "" });
  return <Card className={className}>TraineeStatus</Card>;
}

export default LeadsStatus;
