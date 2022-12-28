import React, { ReactNode } from "react";
import ChildrenContainer from "../../components/baseComponents/ChildrenContainer/ChildrenContainer";

import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import useOnChangeInput from "../../hooks/useOnChangeInput";

import style from "./StatsPages.module.scss";

function StatsPage({
  children,
}: {
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
            LabelProps={{ labelText: "Date Start" }}
            InputProps={{
              type: "date",
              onChange,
              id: "gt",
            }}
          />
          <InputLabel
            LabelProps={{ labelText: "Date End" }}
            InputProps={{ type: "date", onChange, id: "lt" }}
          />
        </span>
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
