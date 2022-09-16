import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { citiesApi } from "../../redux/api/hooksAPI";
import { CitiesTable as CityTableAPi } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import CitiesTable from "./CitiesTable";

function CitiesPage() {
  const [city, setCity] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={APP_ROUTE.CITY_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<CityTableAPi>
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
    </MainRoute>
  );
}

export default CitiesPage;
