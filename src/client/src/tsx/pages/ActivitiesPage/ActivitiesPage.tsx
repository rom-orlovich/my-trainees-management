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

function ActivitiesPage() {
  const [activity, setActivity] = useState<string[]>(["", ""]);
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.ACTIVITIES_ROUTE}>
      <section className={page.page_container}>
        <div className={page.page_header}>
          <AutocompleteInput<ActivitiesTableAPI>
            keys={["activity_name"]}
            id={"activity_id"}
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
            <Link to={`${APP_ROUTE.ACTIVITIES_ROUTE_ADD}`}>Add Activity</Link>
          </span>
        </div>
        <div className={page.page_main_content}>
          <ActivitiesTable mainName={activity[1]} />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ActivitiesPage;
