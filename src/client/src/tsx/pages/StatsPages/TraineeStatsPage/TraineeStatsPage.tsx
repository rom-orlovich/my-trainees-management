import React from "react";

import StatsPage from "../StatsPage";

import StatsPageStyle from "../StatsPages.module.scss";
import TraineeStatsCards from "./TraineeStatsCards";

function TraineeStatsPage() {
  return (
    // <section className={StatsPageStyle.stats_page}>
    //   <div className={StatsPageStyle.stats_page_container}>

    <StatsPage>{(data) => <TraineeStatsCards queryOptions={data} />}</StatsPage>
    // </div>
    // </section>
  );
}

export default TraineeStatsPage;
