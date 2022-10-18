import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { exercisesApi } from "../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";
import ExercisesTable from "./ExercisesTable";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

function ExercisesPage() {
  const [exercise, setExercise] = useState<string[]>(["", ""]);
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.EXERCISES_LIST_ROUTE}
    >
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<ExercisesTableAPI>
            keys={["exercise_name"]}
            id={"exercise_id"}
            queriesOptions={{ ...queriesOptions }}
            loadingSpinnerResult={{ nameData: "Exercises" }}
            setSelectOptionValue={setExercise}
            useGetData={exercisesApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Exercise Name" },
              LabelProps: {
                labelText: "Search Exercise",
                htmlFor: "exerciseSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.EXERCISE_ADD}`}>Add Exercise</Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <ExercisesTable
            mainName={exercise[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ExercisesPage;
