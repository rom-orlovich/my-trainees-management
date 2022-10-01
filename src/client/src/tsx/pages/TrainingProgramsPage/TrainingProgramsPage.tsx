import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TrainingProgramsListAddForm } from "../../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { traineesApi, trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TraineeTableAPI } from "../../redux/api/interfaceAPI";
import TableTrainingProgramList from "./TableTrainingProgramList";
// import style from "./TrainingPrograms.module.scss";
import page_style from "../Page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../../routes/routesConstants";
import { useAppSelector } from "../../redux/hooks";

function TrainingProgramsPage() {
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const userID = useAppSelector((state) => state.authSlice.user?.user_id);
  const [trigger, result] = trainingProgramsListApi.useLazyGetItemsQuery();

  useEffect(() => {
    if (trainee[0]) trigger({ traineeID: Number(trainee[0]) });
  }, [trainee, trigger]);

  const { data, isError, isFetching, isLoading } = result;

  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<TraineeTableAPI>
          keys={["first_name", "last_name"]}
          id={"profile_id"}
          loadingSpinnerResult={{ nameData: "Trainees" }}
          setSelectOptionValue={setTrainee}
          queriesOptions={{ trainerUserId: userID }}
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
      <div className={page_style.page_main_content}>
        <LoadingSpinner
          stateData={{ data, isError, isFetching, isLoading }}
          message="Please Choose Trainee..."
        >
          {(data) => {
            return <TableTrainingProgramList traineeID={Number(trainee[0])} />;
          }}
        </LoadingSpinner>
      </div>
    </section>
  );
}

export default TrainingProgramsPage;
