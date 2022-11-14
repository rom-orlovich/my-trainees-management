import React, { ReactNode } from "react";
import Card from "../../components/baseComponents/Card/Card";
import ChildrenFunComponent, {
  ComponentFunType,
} from "../../components/baseComponents/ChildrenFunComponent/ChildrenFunComponent";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../hooks/useOnChangeInput";
import { GRAPH_TIME_LINE } from "../../redux/api/interfaceAPI";

export type GraphFilterByDates = {
  gt: string;
  lt: string;
};

function GraphCard({
  children,
  className,
  queryOptions,
}: {
  queryOptions: { gt: string; lt: string };
  children: ComponentFunType<{
    timeLineDisplay: string;
    gt: string;
    lt: string;
  }>;
  className?: string;
}) {
  const [{ display }, onChange] = useOnChangeInput({
    display: GRAPH_TIME_LINE.WEEKLY,
  });

  return (
    <Card className={className}>
      <SelectInput
        LabelProps={{ labelText: "Display", htmlFor: "display" }}
        selectProps={{ onChange, defaultValue: display }}
        options={[
          { label: "Weekly", value: GRAPH_TIME_LINE.WEEKLY },
          { label: "Monthly", value: GRAPH_TIME_LINE.MONTHLY },
          { label: "Months", value: GRAPH_TIME_LINE.MONTHS },
          { label: "Years", value: GRAPH_TIME_LINE.YEARS },
        ]}
      />
      <ChildrenFunComponent
        data={{ timeLineDisplay: display, ...queryOptions }}
      >
        {(data) => children(data)}
      </ChildrenFunComponent>
    </Card>
  );
}

export default GraphCard;
