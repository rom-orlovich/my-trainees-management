import React, { useEffect, useState } from "react";
import TraineesTable from "./TraineesTable";
import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";
import { traineesApi } from "../../redux/api/hooksAPI";
import page_style from "../Page.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function TraineesPage() {
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const authSliceState = useAppSelector(getAuthState);
  const queriesOptions = { trainerUserId: authSliceState.user?.user_id };
  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<TraineesTableExtendsAPI>
          keys={["first_name", "last_name"]}
          id={"trainee_id"}
          queriesOptions={queriesOptions}
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
        <TraineesTable mainName={trainee[1]} queriesOptions={queriesOptions} />
      </div>
    </section>
  );
}

export default TraineesPage;
