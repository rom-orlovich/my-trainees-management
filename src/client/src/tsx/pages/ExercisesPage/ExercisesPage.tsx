import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { exercisesApi } from "../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import ExercisesTable from "./ExercisesTable";

function ExercisesPage() {
  const [exercise, setExercise] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={APP_ROUTE.EXERCISES_LIST_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<ExercisesTableAPI>
            keys={["exercise_name"]}
            id={"exercise_id"}
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
        <div className={page_style.page_main_content}>
          <ExercisesTable mainName={exercise[1]} />
        </div>
      </section>
    </MainRoute>
  );
}

export default ExercisesPage;
