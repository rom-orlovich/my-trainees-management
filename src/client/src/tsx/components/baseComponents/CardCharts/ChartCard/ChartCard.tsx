import React, { ReactNode } from "react";

import { InputLabel } from "../../RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../../../hooks/useOnChangeInput";
import { GRAPH_TIME_LINE } from "../../../../redux/api/interfaceAPI";
import { GenericRecord } from "../../../../types";
import style from "./ChartCard.module.scss";
import ChartComponent, {
  ComponentFunType,
} from "../../ChildrenContainer/ChildrenContainer";
import Card from "../../Card/Card";
import { genClassName } from "../../../../utilities/helpersFun";
import useDateRanges from "../../../../hooks/useDateRanges";
import DatesRangeComponent from "../../../DatesRangeComponent/DatesRangeComponent";

function ChartCard({
  children,
  className,
  queryOptions,
  timeLineDisplayOption = true,
  datesRangeDisplayOption = false,
}: {
  queryOptions: Partial<{ gt: string; lt: string }> & GenericRecord<any>;
  children: ComponentFunType<{
    timeLineDisplay: string;
    gt?: string;
    lt?: string;
  }>;
  className?: string;
  timeLineDisplayOption?: boolean;
  datesRangeDisplayOption?: boolean;
}) {
  const [{ period }, onChange] = useOnChangeInput({
    period: GRAPH_TIME_LINE.ALL,
  });

  const datesRangeOptionState = useDateRanges();
  const dateRangeOptions = datesRangeDisplayOption ? datesRangeOptionState : {};
  return (
    <Card className={genClassName(style.chart_card_container, className)}>
      <div className={style.graph__options_container}>
        {timeLineDisplayOption && (
          <SelectInput
            className={style.display_option}
            LabelProps={{ labelText: "Period", htmlFor: "period" }}
            selectProps={{ onChange, defaultValue: period }}
            options={[
              { label: "All", value: GRAPH_TIME_LINE.ALL },
              { label: "Weekly", value: GRAPH_TIME_LINE.WEEKLY },
              { label: "Monthly", value: GRAPH_TIME_LINE.MONTHLY },
              { label: "Months", value: GRAPH_TIME_LINE.MONTHS },
              { label: "Years", value: GRAPH_TIME_LINE.YEARS },
            ]}
          />
        )}
        {datesRangeDisplayOption && (
          <DatesRangeComponent
            inputsDateProps={datesRangeOptionState}
            className={style.dates_range_container}
          />
        )}
      </div>
      <ChartComponent
        className={style.chart_container}
        data={{
          timeLineDisplay: period,
          ...queryOptions,
          ...dateRangeOptions,
        }}
      >
        {(data) => children(data)}
      </ChartComponent>
    </Card>
  );
}

export default ChartCard;
