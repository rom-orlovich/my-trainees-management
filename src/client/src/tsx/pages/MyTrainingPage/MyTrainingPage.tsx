import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { traineesApi, trainingProgramsListApi } from "../../redux/api/hooksAPI";
import {
  TraineesTableExtendsAPI,
  TrainingProgramsListTableAPI,
} from "../../redux/api/interfaceAPI";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import TableTrainingProgramList from "../TrainingProgramsPage/TableTrainingProgramList";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

function MyTrainingPage() {
  // const [program, setProgram] = useState<string[]>(["", ""]);
  // const traineeID=useGetUserLoginData().authState.
  // const authState = useAppSelector(getAuthState);
  // const queriesOptions = { userID: authState.user?.user_id ,programType:program[0]};
  // const [trigger, result] = trainingProgramsListApi.useLazyGetItemsQuery();

  // // useEffect(() => {
  // //   if (trainee[0]) trigger({ traineeID: Number(trainee[0]) });
  // // }, [trainee, trigger]);

  // const { data, isError, isFetching, isLoading } = result;

  return (
    <section className={style.page_container}>
      {/* <div className={style.page_header}>
          <AutocompleteInput<TrainingProgramsListTableAPI>
            keys={["type_program"]}
            id={"training_programs_list_id"}
            loadingSpinnerResult={{ nameData: "Training Program" }}
            setSelectOptionValue={setProgram}
            queriesOptions={{ trainerUserId: queriesOptions.userID }}
            useGetData={trainingProgramsListApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Training Program Name" },
              LabelProps: {
                labelText: "Search Training Program",
                htmlFor: "trainingProgramSearch",
              },
            }}
          />
  
          <span>
        
              <Link to={`${program[0]}/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}>
                Add Program
              </Link>
           
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
        </div> */}
    </section>
  );
}

export default MyTrainingPage;
