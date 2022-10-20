import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TrainingProgramsExerciseStatsList from "./TrainingProgramsExerciseStatsList";

import style from "../Page.module.scss";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

const displayOptions = [
  { label: "Table", value: "table" },
  { label: "Graph", value: "graph" },
];

function TrainingProgramsExerciseStatsPage() {
  const authState = useAppSelector(getAuthState);

  const [{ gt, lt, display }, setQueryState] = useState({
    gt: "",
    lt: "",
    display: "table",
  });

  const onChange = <T extends { id: any; value: any }>(e: ChangeEvent<T>) => {
    setQueryState((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const queriesOptions = {
    trainerUserID: authState.user?.user_id,
    gt,
    lt,
  };
  const content =
    display === "table" ? (
      <TrainingProgramsExerciseStatsList queriesOptions={queriesOptions} />
    ) : (
      <>Comeing Soon</>
    );
  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
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

        <span>
          <SelectInput
            LabelProps={{ labelText: "Display", htmlFor: "display" }}
            selectProps={{ onChange }}
            options={displayOptions}
          />
        </span>
      </div>
      <div className={style.page_main_content}>{content}</div>
    </section>
  );
}

export default TrainingProgramsExerciseStatsPage;
