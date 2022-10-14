import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { equipmentsApi } from "../../redux/api/hooksAPI";
import { EquipmentsTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import page_style from "../Page.module.scss";
import LeadsTable from "./EquipmentsListTable";

function EquipmentsListPage() {
  const [equipment, setEquipment] = useState<string[]>(["", ""]);

  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <MainRoute mainRoutes={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<EquipmentsTableAPI>
            keys={["equipment_name"]}
            id={"equipment_id"}
            queriesOptions={{ ...queriesOptions }}
            loadingSpinnerResult={{ nameData: "Equipments" }}
            setSelectOptionValue={setEquipment}
            useGetData={equipmentsApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Equipment Name" },
              LabelProps: {
                labelText: "Search Equipment",
                htmlFor: "equipmentSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.EQUIPMENT_ADD}`}>Add Equipment</Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <LeadsTable mainName={equipment[1]} queriesOptions={queriesOptions} />
        </div>
      </section>
    </MainRoute>
  );
}

export default EquipmentsListPage;
