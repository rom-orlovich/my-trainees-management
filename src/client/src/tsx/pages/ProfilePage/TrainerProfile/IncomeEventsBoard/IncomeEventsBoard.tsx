import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { meetingApi } from "../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
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
    orderBy: "dateStart",
    gt: curDate.toISOString(),
    numResult: 3,
  };

  return (
    <Card className={genClassName(className)}>
      <ListProfile
        queryOptions={meetingApiOptions}
        useQuery={meetingApi.useGetItemsQuery}
        heading={"Incoming Events"}
        pagePath={`/${APP_ROUTE.SCHEDULE_ROUTE}`}
        LI={IncomeEventBoardLi}
      />
    </Card>
  );
}

export default IncomeEventsBoard;
