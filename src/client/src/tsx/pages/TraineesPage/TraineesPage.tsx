import React, { useEffect, useState } from "react";
import TraineesTable from "./TraineesTable";
import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../routes/routesConstants";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TraineeGetRes } from "../../redux/api/interfaceAPI";
import { traineesApi } from "../../redux/api/hooksAPI";
import page_style from "../Page.module.scss";
import useTrackValues from "../../hooks/useTrackValue";

function Trainees() {
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  // useTrackValues(trainee);
  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<TraineeGetRes>
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
          <Link
            to={`/${APP_ROUTE.TRAINEES_ROUTE}/${APP_ROUTE.TRAINEES_ROUTE_ADD}`}
          >
            Add Trainee
          </Link>
        </span>
      </div>
      <div className={page_style.page_main_content}>
        <TraineesTable name={trainee[1]} />
      </div>
    </section>
  );
}

export default Trainees;
