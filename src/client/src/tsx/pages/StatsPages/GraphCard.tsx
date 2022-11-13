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
    display: GRAPH_TIME_LINE.THIS_MONTH,
  });

  return (
    <Card className={className}>
      <SelectInput
        LabelProps={{ labelText: "Display", htmlFor: "display" }}
        selectProps={{ onChange, defaultValue: display }}
        options={[
          { label: "This Week", value: GRAPH_TIME_LINE.THIS_WEEK },
          { label: "This Month", value: GRAPH_TIME_LINE.THIS_MONTH },
          { label: "Monthly", value: GRAPH_TIME_LINE.MONTHLY },
          { label: "Yearly", value: GRAPH_TIME_LINE.YEARLY },
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
