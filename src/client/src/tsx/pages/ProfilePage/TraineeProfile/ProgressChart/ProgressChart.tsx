import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { dataLabelFormatterByUnit } from "../../../../components/baseComponents/Charts/chartsUtils";
import LineCharts from "../../../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import {
  ChartsDataAPI,
  MeasuresCalResAPI,
  ResponseQueryAPI,
} from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./ProgressChart.module.scss";

function ProgressChart({ className }: PropsBasic) {
  const { profileID, userID } = useGetUserTraineeData();
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    { profileID, userID, measuresChartLine: "true" }
  );
  const Data = data as ResponseQueryAPI<MeasuresCalResAPI> & ChartsDataAPI;
  return (
    <Card className={genClassName(className, style.progress_chart_container)}>
      <Link
        to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_ADD}?profileID=${profileID}`}
      >
        <BsFillPlusSquareFill className={style.plus_button_icon} />
      </Link>
      <LoadingSpinner
        stateData={{ data: Data, isError, isFetching, isLoading }}
        showNoDataMessage={true}
        message={<>Data Not Found</>}
      >
        {(data) => {
          console.log(data);
          return (
            <LineCharts
              datasets={[
                {
                  label: `Measures Weights Progress`,
                  data: data.datasetsValues,
                  backgroundColor: "red",
                  borderColor: "red",
                },
              ]}
              labels={data.labelFormatted}
              options={{
                plugins: {
                  tooltip: {},
                  datalabels: {
                    formatter: dataLabelFormatterByUnit("kg"),
                  },
                },
              }}
            />
          );
        }}
      </LoadingSpinner>
    </Card>
  );
}

export default ProgressChart;
