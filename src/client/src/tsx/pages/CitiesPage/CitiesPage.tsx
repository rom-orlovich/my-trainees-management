import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";

import { citiesApi } from "../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";
import CitiesTable from "./CitiesTable";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlice";

function CitiesPage() {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState<string[]>(["", ""]);
  const authState = useGetUserLoginData();
  const queriesOptions = {
    userID: authState.user_id,
  };
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.CITY_ROUTE}>
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<CitiesTableAPI>
            keys={["city_name"]}
            id={"city_id"}
            queriesOptions={queriesOptions}
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
            {/* <Link to={`${APP_ROUTE.CITY_ROUTE_ADD}`}>Add City</Link> */}
            <Link
              onClick={() => {
                dispatch(openModel({ displayContent: "cityForm" }));
              }}
              to={``}
            >
              Add City
            </Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <CitiesTable mainName={city[1]} queriesOptions={queriesOptions} />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default CitiesPage;
