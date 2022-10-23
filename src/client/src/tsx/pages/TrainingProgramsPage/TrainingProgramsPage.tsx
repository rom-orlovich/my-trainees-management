import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { traineesApi, trainingProgramsListApi } from "../../redux/api/hooksAPI";
import {
  TraineesTableExtendsAPI,
  TrainingProgramsListTableAPI,
} from "../../redux/api/interfaceAPI";
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
  const [queryParmas] = useSearchParams();
  const traineeID = queryParmas.get("traineeID");
  // const [trigger, result] = trainingProgramsListApi.useLazyGetItemsQuery();

  // useEffect(() => {
  //   if (trainee[0])
  //     trigger({ traineeID: Number(trainee[0]), ...queriesOptions });
  // }, [trainee, trigger]);

  // const { data, isError, isFetching, isLoading } = result;

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        {/* <AutocompleteInput<TraineesTableExtendsAPI>
          keys={["first_name", "last_name"]}
          id={"trainee_id"}
          loadingSpinnerResult={{ nameData: "Trainees" }}
          setSelectOptionValue={setTrainee}
          queriesOptions={queriesOptions}
          useGetData={traineesApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Trainee Name" },
            LabelProps: {
              labelText: "Search Trainee",
              htmlFor: "traineeSearch",
            },
          }}
        /> */}
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
        {/* <LoadingSpinner
          showNoDataMessage={true}
          stateData={{ data, isError, isFetching, isLoading }}
          message="Please Choose Trainee..."
        >
          {() => ( */}
        <TableTrainingProgramList
          traineeID={Number(traineeID)}
          queriesOptions={queriesOptions}
        />
        {/* )}
        </LoadingSpinner> */}
      </div>
    </section>
  );
}

export default TrainingProgramsPage;
