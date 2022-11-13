import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { dataLabelFormatterByUnit } from "../../../../components/baseComponents/Charts/chartsUtils";
import LineChart from "../../../../components/baseComponents/Charts/LineChart";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { measuresApi } from "../../../../redux/api/hooksAPI";
import {
  ChartsDataAPI,
  MeasuresCalResAPI,
  ResponseQueryAPI,
} from "../../../../redux/api/interfaceAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import style from "./ProgressChart.module.scss";

function ProgressChart({ className }: PropsBasic) {
  const { profileID, userID } = useGetUserTraineeData();
  const { data, isError, isFetching, isLoading } = measuresApi.useGetItemsQuery(
    {
      profileID,
      userID,
      chartDisplay: "graph",
      asc: "false",
      numResults: 100,
    }
  );
  const Data = data as ResponseQueryAPI<MeasuresCalResAPI> & {
    stats: ChartsDataAPI<number[]>;
  };
  return (
    <Card className={genClassName(className, style.progress_chart_container)}>
      <LoadingSpinner
        stateData={{ data: Data, isError, isFetching, isLoading }}
        showNoDataMessage={true}
        message={<>Data Not Found</>}
      >
        {(data) => (
          <LineChart
            className={style.progress_chart}
            datasets={[
              {
                label: `Measures Weights Progress`,
                data: data.stats.datasetsValues,
                backgroundColor: "red",
                borderColor: "red",
              },
            ]}
            labels={data.stats.labelFormatted}
            options={{
              plugins: {
                datalabels: {
                  formatter: dataLabelFormatterByUnit("kg"),
                },
              },
            }}
          />
        )}
      </LoadingSpinner>
    </Card>
  );
}

export default ProgressChart;
