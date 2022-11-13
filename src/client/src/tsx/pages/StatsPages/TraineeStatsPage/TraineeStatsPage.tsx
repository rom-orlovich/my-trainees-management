import React from "react";

import StatsPage from "../StatsPage";

import TraineeStatsCards from "./TraineeStatsCards";

function TraineeStatsPage() {
  return (
    <StatsPage>{(data) => <TraineeStatsCards queryOptions={data} />}</StatsPage>
  );
}

export default TraineeStatsPage;
