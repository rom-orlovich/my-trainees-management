import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import { GetCitiesGendersAgesStatsAPI } from "../../../redux/api/interfaceAPI";

import StatsPageStyle from "../StatsPages.module.scss";

function TraineeStatsPage() {
  const { user_id } = useGetUserLoginData();
  const { data, isLoading, isFetching, isError } = traineesApi.useGetItemsQuery(
    {
      userID: user_id,
      displayStats: "all",
    }
  );

  return (
    <section className={StatsPageStyle.stats_page}>
      <div className={StatsPageStyle.stats_page_container}>
        <LoadingSpinner stateData={{ data, isLoading, isFetching, isError }}>
          {(data) => {
            const Data = data as unknown as {
              stats: GetCitiesGendersAgesStatsAPI;
            };
            console.log(Data);
            return (
              <>
                <Card
                  className={StatsPageStyle.distribution_card_container}
                ></Card>
                <Card
                  className={StatsPageStyle.distribution_card_container}
                ></Card>
                <Card
                  className={StatsPageStyle.distribution_card_container}
                ></Card>
                <Card className={StatsPageStyle.chart_card_container}></Card>
              </>
            );
          }}
        </LoadingSpinner>
      </div>
    </section>
  );
}

export default TraineeStatsPage;
