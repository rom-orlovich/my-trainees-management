import { ChangeEvent, useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import ExerciseStatsTable from "./ExerciseStatsTable";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";
import style from "./ExerciseStatsPage.module.scss";
import ExerciseStatsChart from "./ExerciseStatsChart";
import useOnChangeInput from "../../hooks/useOnChangeInput";

const displayOptions = [
  { label: "Table", value: "table" },
  { label: "Graph", value: "graph" },
];

function ExerciseStatsPage() {
  const [queryParams] = useSearchParams();
  const authState = useAppSelector(getAuthState);

  const [{ gt, lt, display }, onChange] = useOnChangeInput({
    gt: "",
    lt: "",
    display: "graph",
  });

  const params = useParams();
  const { exerciseID } = params;
  const queriesOptions = {
    trainerUserID: authState.user?.user_id,
    gt,
    lt,
    exerciseID,
  };
  const content =
    display === "graph" ? (
      <ExerciseStatsChart queriesOptions={queriesOptions} />
    ) : (
      <>
        <h1 className={style.exercise_name}>{queryParams.get("exercise")} </h1>
        <ExerciseStatsTable queriesOptions={queriesOptions} />
      </>
    );

  return (
    <section
      className={genClassName(
        page.page_container,
        style.exercise_stats_page_container
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

export default ExerciseStatsPage;
