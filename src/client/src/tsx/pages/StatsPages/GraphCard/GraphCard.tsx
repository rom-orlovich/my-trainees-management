import React, { ReactNode } from "react";
import Card from "../../../components/baseComponents/Card/Card";
import ChildrenFunComponent, {
  ComponentFunType,
} from "../../../components/baseComponents/ChildrenFunComponent/ChildrenFunComponent";
import { InputLabel } from "../../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../../hooks/useOnChangeInput";
import { GRAPH_TIME_LINE } from "../../../redux/api/interfaceAPI";
import { GenericRecord } from "../../../types";
import style from "./GraphCard.module.scss";

export type GraphFilterByDates = {
  gt: string;
  lt: string;
};

function GraphCard({
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
  const [{ display }, onChange] = useOnChangeInput({
    display: GRAPH_TIME_LINE.MONTHS,
  });
  const [datesRangeOption, onChangeDates] = useOnChangeInput({
    gt: "",
    lt: "",
  });
  console.log(datesRangeOption);
  const dateRangeOptions = datesRangeDisplayOption ? datesRangeOption : {};
  return (
    <Card className={className}>
      <div className={style.display_graph__options_container}>
        {timeLineDisplayOption && (
          <SelectInput
            LabelProps={{ labelText: "Display", htmlFor: "display" }}
            selectProps={{ onChange, defaultValue: display }}
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
          <span className={style.dates_container}>
            <InputLabel
              LabelProps={{ labelText: "Date Start" }}
              InputProps={{
                type: "date",
                onChange: onChangeDates,
                id: "gt",
              }}
            />
            <InputLabel
              LabelProps={{ labelText: "Date End" }}
              InputProps={{ type: "date", onChange: onChangeDates, id: "lt" }}
            />
          </span>
        )}
      </div>
      <ChildrenFunComponent
        data={{
          timeLineDisplay: display,

          ...queryOptions,
          ...dateRangeOptions,
        }}
      >
        {(data) => children(data)}
      </ChildrenFunComponent>
    </Card>
  );
}

export default GraphCard;
