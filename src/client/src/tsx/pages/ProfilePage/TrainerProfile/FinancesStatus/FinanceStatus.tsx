import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { financesApi } from "../../../../redux/api/hooksAPI";

function FinancesStatus({ className }: PropsBasic) {
  const {} = financesApi.useGetFinancesQuery({});
  return <Card className={className}>TraineeStatus</Card>;
}

export default FinancesStatus;
