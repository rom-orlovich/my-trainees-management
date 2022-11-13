import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { financesApi } from "../../../../redux/api/hooksAPI";
import { CHART_DISPLAY } from "../../../../redux/api/interfaceAPI";
import { TrainerProfileProps } from "../TrainerProfile";

function FinancesStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data } = financesApi.useGetFinancesQuery({
    ...queryOptions,
    chartDisplay: CHART_DISPLAY.DISTRIBUTION,
  });

  return (
    <Card className={className}>
      <div>
        <h2>Total Incomes:</h2>
        <div> {data?.stats.totalFinancesSum.incomes}</div>
      </div>
      <div>
        <h2>Total Expenses:</h2>
        <div> {data?.stats.totalFinancesSum.expenses}</div>
      </div>
    </Card>
  );
}

export default FinancesStatus;
