import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import InsteadOutletRoutes from "../../../routes/utilities/InsteadOutletRoutes";
import StatsPageStyle from "../StatsPages.module.scss";

function TraineeStatsPage() {
  return (
    <section className={StatsPageStyle.stats_page}>
      <div className={StatsPageStyle.stats_page_container}>
        <Card className={StatsPageStyle.distribution_card_container}>HEY </Card>
        <Card className={StatsPageStyle.distribution_card_container}> </Card>
        <Card className={StatsPageStyle.distribution_card_container}> </Card>
        <Card className={StatsPageStyle.chart_card_container}></Card>
      </div>
    </section>
  );
}

export default TraineeStatsPage;
