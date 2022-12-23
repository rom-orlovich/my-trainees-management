import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TraineesTable from "./TraineesTable";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";
import { traineesApi } from "../../redux/api/hooksAPI";
import style from "../Page.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

function Trainees() {
  const [trainee, setTrainee] = useState<string[]>(["", ""]);
  const authSliceState = useAppSelector(getAuthState);
  const queriesOptions = { trainerUserID: authSliceState.user?.user_id };
  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
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
      <div className={style.page_main_content}>
        <TraineesTable mainName={trainee[1]} queriesOptions={queriesOptions} />
      </div>
    </section>
  );
}

export default function TraineesPage() {
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={[APP_ROUTE.TRAINEES_ROUTE, ""]}
    >
      <Trainees />
    </InsteadOutletRoutes>
  );
}
