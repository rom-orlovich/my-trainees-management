/* eslint-disable camelcase */
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  dataLabelFormatterByUnit,
  labelFormatterByUnit,
  PIE_CHART_FONTS,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import PieChart from "../../../../components/baseComponents/Charts/PieChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";

import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
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
  const [queryParams] = useSearchParams();

  const username = queryParams.get("username");
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    {
      trainerUserID: useGetUserLoginData().user_id,
      username,
      caloriesPie: "true",
    }
  );
  const PROTEIN_COLOR = "rgb(240 ,91, 85)";
  const CRABS_COLOR = "rgb(0 ,182, 196)";
  const FATS_COLOR = " rgb(250 ,209 ,55)";
  return (
    <Card className={genClassName(className, style.calories_chart_container)}>
      <LoadingSpinner
        message={
          <Link
            to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_EDIT}?username=${username}`}
          >
            Add Measure
          </Link>
        }
        stateData={{ data, isError, isFetching, isLoading }}
      >
        {(data) => {
          const { caloriesDisplay, weightsDisplay, calories_total } =
            data as unknown as CaloriesChartRes;

          return (
            <>
              <h2> Calories Chart</h2>
              <div className={style.calories_heading}>
                <h3>{calories_total} cal</h3>
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
                      position: "average",

                      padding: 10,
                      bodyFont: {
                        size: 18,
                      },
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
