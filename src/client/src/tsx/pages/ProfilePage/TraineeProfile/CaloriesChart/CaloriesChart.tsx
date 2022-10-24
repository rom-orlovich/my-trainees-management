import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  dataLabelFormatterByPercents,
  dataLabelFormatterByUnit,
  labelFormatterByPercents,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../../components/baseComponents/Charts/PieChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import useGetQueryParams from "../../../../hooks/useGetQueryParams";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./CaloriesChart.module.scss";

interface CaloriesChartRes {
  weightsDisplay: {
    labelFormatted: string[];
    datasetsValues: number[];
  };
  caloriesDisplay: {
    labelFormatted: string[];
    datasetsValues: number[];
  };
  calories_total: number;
}
function CaloriesChart({ className }: PropsBasic) {
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    {
      trainerUserID: useGetUserLoginData().user_id,
      username: useGetQueryParams("username"),
      caloriesPie: "true",
    }
  );
  const PROTEIN_COLOR = "rgb(240 ,91, 85)";
  const CRABS_COLOR = "rgb(0 ,182, 196)";
  const FATS_COLOR = " rgb(250 ,209 ,55)";
  return (
    <Card className={genClassName(className, style.calories_chart_container)}>
      <LoadingSpinner stateData={{ data, isError, isFetching, isLoading }}>
        {(data) => {
          console.log(data);
          const { caloriesDisplay, weightsDisplay, calories_total } =
            data as unknown as CaloriesChartRes;

          return (
            <>
              <div className={style.calories_heading}>
                <h2>{calories_total} cal</h2>
              </div>
              <PieChart
                className={style.pie_chart}
                datasets={[
                  {
                    label: "Calories Chart",
                    data: caloriesDisplay.datasetsValues,
                    backgroundColor: [PROTEIN_COLOR, FATS_COLOR, CRABS_COLOR],
                    borderColor: [PROTEIN_COLOR, FATS_COLOR, CRABS_COLOR],
                  },
                ]}
                labels={caloriesDisplay.labelFormatted}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: { label: labelFormatterByUnit("cal") },
                    },
                    datalabels: {
                      formatter: dataLabelFormatterByUnit("cal"),
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

export default CaloriesChart;
