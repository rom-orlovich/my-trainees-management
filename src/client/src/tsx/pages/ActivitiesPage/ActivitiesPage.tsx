/* eslint-disable camelcase */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { activitiesApi } from "../../redux/api/hooksAPI";
import { ActivitiesTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import page from "../Page.module.scss";
import ActivitiesTable from "./ActivitiesTable";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { openModel } from "../../redux/slices/modelControllerSlice";
import { useAppDispatch } from "../../redux/hooks";

function ActivitiesPage() {
  const dispatch = useAppDispatch();
  const [activity, setActivity] = useState<string[]>(["", ""]);
  const authState = useGetUserLoginData();
  const queriesOptions = {
    userID: authState.user_id,
  };
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.ACTIVITIES_ROUTE}>
      <section className={page.page_container}>
        <div className={page.page_header}>
          <AutocompleteInput<ActivitiesTableAPI>
            keys={["activity_name"]}
            id={"activity_id"}
            queriesOptions={queriesOptions}
            loadingSpinnerResult={{ nameData: "Activity" }}
            setSelectOptionValue={setActivity}
            useGetData={activitiesApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Activity Name" },
              LabelProps: {
                labelText: "Search Activity",
                htmlFor: "ActivitySearch",
              },
            }}
          />

          <span>
            {/* <Link to={`${APP_ROUTE.ACTIVITIES_ROUTE_ADD}`}>Add Activity</Link> */}
            <Link
              onClick={() => {
                dispatch(openModel({ displayContent: "activityForm" }));
              }}
              to={``}
            >
              Add Activity
            </Link>
          </span>
        </div>
        <div className={page.page_main_content}>
          <ActivitiesTable
            mainName={activity[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ActivitiesPage;
