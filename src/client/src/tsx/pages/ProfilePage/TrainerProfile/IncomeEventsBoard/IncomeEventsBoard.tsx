import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { meetingApi } from "../../../../redux/api/hooksAPI";
import ListProfile from "../../ListProfile/ListProfile";
import { TrainerProfileProps } from "../TrainerProfile";
import IncomeEventBoardLi from "./IncomeEventBoardLi";

function IncomeEventsBoard({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const curDate = new Date();
  const meetingApiOptions = {
    ...queryOptions,
    gt: curDate.toISOString(),
    numResult: 3,
  };

  return (
    <Card className={className}>
      <ListProfile
        queryOptions={meetingApiOptions}
        useQuery={meetingApi.useGetItemsQuery}
        heading={"Incoming Event"}
        LI={IncomeEventBoardLi}
      />
    </Card>
  );
}

export default IncomeEventsBoard;
