/* eslint-disable camelcase */
import React from "react";

import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import {
  COLORS_CHART,
  dataLabelFormatterByUnit,
  DOUGHNUT_CHART_FONTS,
  labelFormatterByUnit,
} from "../../../../components/baseComponents/Charts/chartsUtils";
import DoughnutChart from "../../../../components/baseComponents/Charts/DoughnutChart";

import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { SelectInput } from "../../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import useOnChangeInput from "../../../../hooks/useOnChangeInput";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import {
  ChartsDataAPI,
  CHART_DISPLAY,
} from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import style from "./CaloriesChart.module.scss";

interface CaloriesChartRes {
  weightsDisplay: ChartsDataAPI<number[]>;
  caloriesDisplay: ChartsDataAPI<number[]>;
  calories_total: number;
}
function CaloriesChart({
  className,
  queryOptions,
}: PropsBasic & TraineeProfileProps) {
  const { profileID, username } = useGetUserTraineeData();
  const [state, onChange] = useOnChangeInput<{ display: "Kcal" | "g" }>({
    display: "Kcal",
  });
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    {
      ...queryOptions,
      profileID,
      chartDisplay: CHART_DISPLAY.DISTRIBUTION,
    }
  );

  return (
    <Card className={genClassName(className, style.calories_chart_container)}>
      <SelectInput
        LabelProps={{ labelText: "", htmlFor: "display" }}
        selectProps={{ onChange, defaultValue: state.display }}
        options={[
          { label: "g", value: "g" },
          { label: "Kcal", value: "Kcal" },
        ]}
      />
      <LoadingSpinner
        message={
          <Link
            to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_EDIT}?profileID=${profileID}`}
          >
            Add Measure
          </Link>
        }
        stateData={{ data, isError, isFetching, isLoading }}
      >
        {(data) => {
          const { stats } = data as unknown as {
            stats: { caloriesChart: CaloriesChartRes };
          };
          const {
            caloriesChart: { caloriesDisplay, weightsDisplay, calories_total },
          } = stats;
          const caloriesPieDisplay = {
            g: weightsDisplay,
            Kcal: caloriesDisplay,
          }[state.display];
          return (
            <>
              <h2> Calories Chart</h2>

              <DoughnutChart
                className={style.pie_chart}
                datasets={[
                  {
                    label: "Calories Chart",
                    data: caloriesPieDisplay.datasetsValues,
                    backgroundColor: [
                      COLORS_CHART.RED,
                      COLORS_CHART.YELLOW,
                      COLORS_CHART.BLUE,
                    ],
                    borderColor: [
                      COLORS_CHART.RED,
                      COLORS_CHART.YELLOW,
                      COLORS_CHART.BLUE,
                    ],
                  },
                ]}
                labels={caloriesPieDisplay.labelFormatted}
                options={{
                  plugins: {
                    pluginCenter: {
                      textCenter: `${calories_total}Kcal `,
                      fontSize: "1.2",
                    },
                    tooltip: {
                      callbacks: { label: labelFormatterByUnit(state.display) },
                      position: "average",
                      padding: 10,

                      bodyFont: {
                        size: 18,
                      },
                    },
                    datalabels: {
                      formatter: dataLabelFormatterByUnit(state.display),
                      ...DOUGHNUT_CHART_FONTS,
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
