import React, { ReactNode } from "react";
import ChildrenContainer from "../../components/baseComponents/ChildrenContainer/ChildrenContainer";

import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import DatesRangeComponent from "../../components/DatesRangeComponent/DatesRangeComponent";
import useDateRanges from "../../hooks/useDateRanges";
import useOnChangeInput from "../../hooks/useOnChangeInput";

import style from "./StatsPages.module.scss";

function StatsPage({
  children,
}: {
  children: (data: { gt: string; lt: string }) => ReactNode;
}) {
  const datesRangeOptionState = useDateRanges();

  const { onChange, ...queryOptions } = datesRangeOptionState;
  return (
    <section className={style.stats_page}>
      <div className={style.stats_page_header_filters}>
        <DatesRangeComponent
          className={style.dates_container}
          inputsDateProps={datesRangeOptionState}
        />
      </div>

      <ChildrenContainer
        data={queryOptions}
        className={style.stats_page_container}
      >
        {(data) => children(data)}
      </ChildrenContainer>
    </section>
  );
}

export default StatsPage;
