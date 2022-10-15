import { useEffect, useState } from "react";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";

import style from "../Page.module.scss";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import TableTrainingProgramList from "../TrainingProgramsPage/TableTrainingProgramList";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

function MyWorkoutsPage() {
  const userData = useGetUserLoginData();
  const [trainingProgram, setTrainingProgram] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = {
    programType: trainingProgram[1],
    trainerUserID: authState.user?.user_id,
    traineeID: authState.user?.trainee_id,
  };

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
      </div>
      <div className={style.page_main_content}>
        <TableTrainingProgramList
          traineeID={Number(userData.authState.user?.trainee_id || 0)}
          queriesOptions={queriesOptions}
        />
      </div>
    </section>
  );
}

export default MyWorkoutsPage;
