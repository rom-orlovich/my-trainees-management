import React, { ReactNode } from "react";
import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";
import ChildrenFunComponent from "../../components/baseComponents/ChildrenFunComponent/ChildrenFunComponent";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../hooks/useOnChangeInput";
import { GenericRecord } from "../../types";
import style from "./StatsPages.module.scss";

function StatsPage({
  children,
}: // PropsBasic &
{
  children: (data: { gt: string; lt: string }) => ReactNode;
}) {
  const [queryOptions, onChange] = useOnChangeInput({
    gt: "",
    lt: "",
  });

  return (
    <section className={style.stats_page}>
      <div className={style.stats_page_header_filters}>
        <span className={style.dates_container}>
          <InputLabel
            LabelProps={{ labelText: "Date Start", htmlFor: "gt" }}
            InputProps={{ type: "date", onChange }}
          />
          <InputLabel
            LabelProps={{ labelText: "Date End", htmlFor: "lt" }}
            InputProps={{ type: "date", onChange }}
          />
        </span>
      </div>

      <div className={style.stats_page_container}>
        <ChildrenFunComponent data={queryOptions}>
          {(data) => children(data)}
        </ChildrenFunComponent>
      </div>
    </section>
  );
}

export default StatsPage;
