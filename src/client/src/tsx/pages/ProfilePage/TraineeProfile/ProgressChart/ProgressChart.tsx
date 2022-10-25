import React from "react";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./ProgressChart.module.scss";

function ProgressChart({ className }: PropsBasic) {
  return (
    <Card className={genClassName(className, style.progress_chart_container)}>
      <LoadingSpinner
        stateData={{ data: undefined }}
        showNoDataMessage={true}
        message={<>Data Not Found</>}
      >
        {() => <></>}
      </LoadingSpinner>
    </Card>
  );
}

export default ProgressChart;
