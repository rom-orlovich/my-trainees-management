import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { traineesApi, trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";
import TableTrainingProgramList from "./TableTrainingProgramList";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function TrainingProgramsPage() {
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = { userID: authState.user?.user_id };
  const [trigger, result] = trainingProgramsListApi.useLazyGetItemsQuery();

  useEffect(() => {
    if (trainee[0]) trigger({ traineeID: Number(trainee[0]) });
  }, [trainee, trigger]);

  const { data, isError, isFetching, isLoading } = result;

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<TraineesTableExtendsAPI>
          keys={["first_name", "last_name"]}
          id={"profile_id"}
          loadingSpinnerResult={{ nameData: "Trainees" }}
          setSelectOptionValue={setTrainee}
          queriesOptions={{ trainerUserID: queriesOptions.userID }}
          useGetData={traineesApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Trainee Name" },
            LabelProps: {
              labelText: "Search Trainee",
              htmlFor: "traineeSearch",
            },
          }}
        />

        <span>
          {trainee[0] && (
            <Link to={`${trainee[0]}/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}>
              Add Program
            </Link>
          )}
        </span>
      </div>
      <div className={style.page_main_content}>
        <LoadingSpinner
          stateData={{ data, isError, isFetching, isLoading }}
          message="Please Choose Trainee..."
        >
          {() => (
            <TableTrainingProgramList
              traineeID={Number(trainee[0])}
              queriesOptions={queriesOptions}
            />
          )}
        </LoadingSpinner>
      </div>
    </section>
  );
}

export default TrainingProgramsPage;
