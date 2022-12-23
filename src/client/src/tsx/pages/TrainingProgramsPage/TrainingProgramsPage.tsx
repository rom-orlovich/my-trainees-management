import { useState } from "react";
import { Link } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";
import TrainingProgramsTable from "./TrainingProgramsTable";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import InsteadOutletRoutes from "../../routes2/utilities/InsteadOutletRoutes";

function TrainingPrograms() {
  const { traineeID } = useGetUserTraineeData();
  const [trainingProgram, setTrainingProgram] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);

  const queriesOptions = {
    traineeID,
    programType: trainingProgram[1],
    trainerUserID: authState.user?.user_id,
    orderBy: "updateDate",
    asc: "false",
  };

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<TrainingProgramsListTableAPI>
          keys={["program_type"]}
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
            <Link
              to={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}?traineeID=${traineeID}`}
            >
              Add Program
            </Link>
          )}
        </span>
      </div>
      <div className={style.page_main_content}>
        <TrainingProgramsTable
          traineeID={traineeID}
          queriesOptions={queriesOptions}
        />
      </div>
    </section>
  );
}

export default function TrainingProgramsPage() {
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={[APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE]}
    >
      <TrainingPrograms />
    </InsteadOutletRoutes>
  );
}
