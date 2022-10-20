import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import TrainingProgramsExerciseStatsList from "./TrainingProgramsExerciseStatsList";

import style from "../Page.module.scss";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

function TrainingProgramsExerciseStatsPage() {
  const authState = useAppSelector(getAuthState);

  const [state, setState] = useState({} as { gt: string; lt: string });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setState({ [e.target.name]: e.target.value } as { gt: string; lt: string });
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  const queriesOptions = {
    trainerUserID: authState.user?.user_id,
    gt: state?.gt || "",
    lt: state?.lt || "",
  };
  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        {/* <span>{<Link to={``}>Add Program</Link>}</span> */}
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
            LabelProps={{ labelText: "Display" }}
            selectProps={{}}
            options={[{ label: "Table", value: "table" }]}
          ></SelectInput>
        </span>
      </div>
      <div className={style.page_main_content}>
        <TrainingProgramsExerciseStatsList queriesOptions={queriesOptions} />
      </div>
    </section>
  );
}

export default TrainingProgramsExerciseStatsPage;
