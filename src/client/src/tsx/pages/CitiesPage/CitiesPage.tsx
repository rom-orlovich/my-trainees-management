import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { citiesApi } from "../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import page_style from "../Page.module.scss";
import CitiesTable from "./CitiesTable";

function CitiesPage() {
  const [city, setCity] = useState<string[]>(["", ""]);

  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.CITY_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<CitiesTableAPI>
            keys={["city_name"]}
            id={"city_id"}
            loadingSpinnerResult={{ nameData: "Cities" }}
            setSelectOptionValue={setCity}
            useGetData={citiesApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "City Name" },
              LabelProps: {
                labelText: "Search City",
                htmlFor: "citySearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.CITY_ROUTE_ADD}`}>Add City</Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <CitiesTable mainName={city[1]} />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default CitiesPage;
