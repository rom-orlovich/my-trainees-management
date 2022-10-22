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

const displayOptions = [
  { label: "Table", value: "table" },
  { label: "Graph", value: "graph" },
];

function TrainingProgramsExerciseStatsPage() {
  const authState = useAppSelector(getAuthState);
  const [queryParams] = useSearchParams();
  const [{ gt, lt, display }, setQueryState] = useState({
    gt: "",
    lt: "",
    display: "graph",
  });

  const onChange = <T extends { id: any; value: any }>(e: ChangeEvent<T>) => {
    setQueryState((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };
  const params = useParams();
  const { exerciseID } = params;
  const queriesOptions = {
    trainerUserID: authState.user?.user_id,
    gt,
    lt,
    exerciseID,
  };
  const content =
    display === "table" ? (
      <ExerciseStatsTable queriesOptions={queriesOptions} />
    ) : (
      <ExerciseStatsChart queriesOptions={queriesOptions} />
    );

  return (
    <section className={page.page_container}>
      <h1 className={style.exercise_name}>{queryParams.get("exercise")} </h1>
      <div className={genClassName(page.page_header, style.stats_header)}>
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

        <SelectInput
          LabelProps={{ labelText: "Display", htmlFor: "display" }}
          selectProps={{ onChange }}
          options={displayOptions}
        />
      </div>
      <div className={page.page_main_content}>{content}</div>
    </section>
  );
}

export default TrainingProgramsExerciseStatsPage;
