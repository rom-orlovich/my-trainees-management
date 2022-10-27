import { ChangeEvent, useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";
// import style from "./ExerciseStatsPage.module.scss";
import useOnChangeInput from "../../hooks/useOnChangeInput";
import ExpensesTable from "./ExpensesTable/ExpensesTable";
import IncomesTable from "./IncomesTable/IncomesTable";

const displayOptions = [
  { label: "Table", value: "table" },
  { label: "Graph", value: "graph" },
];

function FinancesPage() {
  const authState = useAppSelector(getAuthState);

  const [{ gt, lt, display }, setQueryState] = useState({
    gt: "",
    lt: "",
    display: "graph",
  });

  const [state, onChange] = useOnChangeInput({});

  const queriesOptions = {};
  const content =
    display === "graph" ? (
      // <ExerciseStatsChart queriesOptions={queriesOptions} />
      <IncomesTable />
    ) : (
      <ExpensesTable />
    );

  return (
    <section
      className={genClassName(
        page.page_container
        // page.exercise_stats_page_container
      )}
    >
      <div className={genClassName(page.page_header)}>
        <span className={page.dates_container}>
          <InputLabel
            LabelProps={{ labelText: "Date Start", htmlFor: "gt" }}
            InputProps={{ type: "date", onChange }}
          />
          <InputLabel
            LabelProps={{ labelText: "Date End", htmlFor: "lt" }}
            InputProps={{ type: "date", onChange }}
          />
        </span>

        <SelectInput
          LabelProps={{ labelText: "Display", htmlFor: "display" }}
          selectProps={{ onChange, defaultValue: display }}
          options={displayOptions}
        />
      </div>
      <div className={page.page_main_content}>{content}</div>
    </section>
  );
}

export default FinancesPage;
