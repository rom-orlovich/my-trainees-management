import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";
import TableTrainingProgramList from "./TableTrainingProgramList";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function TrainingProgramsPage() {
  // const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const [trainingProgram, setTrainingProgram] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = {
    trainerUserID: authState.user?.user_id,
  };
  const [queryParams] = useSearchParams();
  const traineeID = queryParams.get("traineeID");

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<TrainingProgramsListTableAPI>
          keys={["type_program"]}
          id={"training_programs_list_id"}
          loadingSpinnerResult={{ nameData: "Workout" }}
          setSelectOptionValue={setTrainingProgram}
          queriesOptions={queriesOptions}
          useGetData={trainingProgramsListApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Workout Name" },
            LabelProps: {
              labelText: "Search Workout",
              htmlFor: "searchWorkout",
            },
          }}
        />

        <span>
          {traineeID && (
            <Link to={`${traineeID}/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}>
              Add Program
            </Link>
          )}
        </span>
      </div>
      <div className={style.page_main_content}>
        <TableTrainingProgramList
          traineeID={Number(traineeID)}
          queriesOptions={queriesOptions}
        />
      </div>
    </section>
  );
}

export default TrainingProgramsPage;
