import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { locationsApi } from "../../redux/api/hooksAPI";
import { LocationsGetRes } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import LeadsTable from "./LocationsTable";

function LocationsListPage() {
  const [location, setLocation] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={APP_ROUTE.LOCATION_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<LocationsGetRes>
            keys={["street", "city_name"]}
            id={"location_id"}
            loadingSpinnerResult={{ nameData: "Locations" }}
            setSelectOptionValue={setLocation}
            useGetData={locationsApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Location Name" },
              LabelProps: {
                labelText: "Search Location",
                htmlFor: "locationSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.LOCATION_ROUTE_ADD}`}>Add Location</Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <LeadsTable mainName={location[1]} />
        </div>
      </section>
    </MainRoute>
  );
}

export default LocationsListPage;
