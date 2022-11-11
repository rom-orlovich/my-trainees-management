import React from "react";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  COLORS_CHART,
  dataLabelFormatterByUnit,
  DOUGHNUT_CHART_FONTS,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../../components/baseComponents/Charts/PieChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { leadsApi } from "../../../../redux/api/hooksAPI";
import { LeadsStatsAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { TrainerProfileProps } from "../TrainerProfile";
import style from "../../ChartProfileStyle/ChartProfileStyle.module.scss";
import { genClassName } from "../../../../utilities/helpersFun";

function LeadsStatus({
  className,
  queryOptions,
}: PropsBasic & TrainerProfileProps) {
  const { data, isError, isFetching, isLoading } = leadsApi.useGetItemsQuery({
    ...queryOptions,
    displayStats: "distribution",
  });

  return (
    <Card className={genClassName(className, style.chart_profile_container)}>
      <LoadingSpinner
        message={
          <Link to={`/${APP_ROUTE.LEADS_ROUTE}/${APP_ROUTE.LEADS_ROUTE_ADD}`}>
            Add Measure
          </Link>
        }
        stateData={{ data, isError, isFetching, isLoading }}
      >
        {(data) => {
          const { stats } = data as unknown as { stats: LeadsStatsAPI };
          const { calStatsHandlesLeadsRes } = stats;
          // const caloriesPieDisplay = {
          //   g: weightsDisplay,
          //   Kcal: caloriesDisplay,
          // }[state.display];
          return (
            <>
              <h2> Calories Chart</h2>

              <PieChart
                className={style.pie_chart}
                datasets={[
                  {
                    label: "Leads Handle",
                    data: calStatsHandlesLeadsRes?.datasetsValues || [],
                    backgroundColor: [COLORS_CHART.GREEN, COLORS_CHART.RED],
                    borderColor: [COLORS_CHART.GREEN, COLORS_CHART.RED],
                  },
                ]}
                labels={calStatsHandlesLeadsRes?.labelFormatted || []}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: { label: labelFormatterByUnit("leads") },
                      position: "average",
                      padding: 10,

                      bodyFont: {
                        size: 18,
                      },
                    },
                    datalabels: {
                      formatter: dataLabelFormatterByUnit("leads"),
                      ...PIE_CHART_FONTS,
                    },
                  },
                }}
              />
            </>
          );
        }}
      </LoadingSpinner>
    </Card>
  );
}

export default LeadsStatus;
