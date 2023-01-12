import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { locationsApi } from "../../redux/api/hooksAPI";
import { LocationsGetRes } from "../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";
import LocationTable from "./LocationsTable";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

function LocationsListPage() {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = { userID: authState.user?.user_id };
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.LOCATION_ROUTE}>
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<LocationsGetRes>
            keys={["street", "city_name"]}
            id={"location_id"}
            queriesOptions={queriesOptions}
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
            {/* <Link to={`${APP_ROUTE.LOCATION_ROUTE_ADD}`}>Add Location</Link> */}
            <Link
              onClick={() => {
                dispatch(openModel({ displayContent: "locationForm" }));
              }}
              to={``}
            >
              Add Location
            </Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <LocationTable
            mainName={location[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default LocationsListPage;
