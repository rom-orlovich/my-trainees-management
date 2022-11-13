import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../redux/api/interfaceAPI";
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
