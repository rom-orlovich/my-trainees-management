import React from "react";

import StatsPage from "../StatsPage";

import FinanceStatsCard from "./FinancesStatsCards";

function FinanceStatsPage() {
  return (
    <StatsPage>{(data) => <FinanceStatsCard queryOptions={data} />}</StatsPage>
  );
}

export default FinanceStatsPage;
