import React from "react";

import StatsPage from "../StatsPage";

import LeadsStatsCard from "./LeadsStatsCards";

function LeadsStatsPage() {
  return (
    <StatsPage>{(data) => <LeadsStatsCard queryOptions={data} />}</StatsPage>
  );
}

export default LeadsStatsPage;
