import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TrainingProgramsListAddForm } from "../../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineeTableAPI } from "../../redux/api/interfaceAPI";
import TableTrainingProgramList from "./TableTrainingProgramList";
// import style from "./TrainingPrograms.module.scss";
import page_style from "../Page.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../../routes/routesConstants";

function TrainingProgramsPage() {
  const navigate = useNavigate();
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const [trigger, result] = traineesApi.useLazyGetItemByIDQuery();

  useEffect(() => {
    if (trainee[0]) trigger(Number(trainee[0]));
  }, [trainee, trigger]);

  const { data, isError, isFetching, isLoading } = result;
  useEffect(() => {
    if (data && !data.training_programs_list_id)
      navigate(`${trainee[0]}/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`);
  }, [data, trainee, navigate]);

  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<TraineeTableAPI>
          keys={["first_name", "last_name"]}
          id={"profile_id"}
          loadingSpinnerResult={{ nameData: "Trainees" }}
          setSelectOptionValue={setTrainee}
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
            if (data.training_programs_list_id) {
              return (
                <TableTrainingProgramList
                  traineeID={data.profile_id as number}
                />
              );
            }
          }}
        </LoadingSpinner>
      </div>
    </section>
  );
}

export default TrainingProgramsPage;
