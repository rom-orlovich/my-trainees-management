import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { leadsApi } from "../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";
import LeadsTable from "./LeadsTable";

function LeadsPage() {
  const [lead, setLead] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = {
    userID: authState.user?.user_id,
    orderBy: "leadDate",
    asc: "false",
  };
  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<LeadsTableAPI>
          keys={["first_name", "last_name"]}
          id={"lead_id"}
          queriesOptions={queriesOptions}
          loadingSpinnerResult={{ nameData: "Leads" }}
          setSelectOptionValue={setLead}
          useGetData={leadsApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Lead Name" },
            LabelProps: {
              labelText: "Search Lead",
              htmlFor: "leadSearch",
            },
          }}
        />

        <span>
          <Link to={`/${APP_ROUTE.LEADS_ROUTE}/${APP_ROUTE.LEADS_ROUTE_ADD}`}>
            Add Lead
          </Link>
        </span>
      </div>
      <div className={style.page_main_content}>
        <LeadsTable mainName={lead[1]} queriesOptions={queriesOptions} />
      </div>
    </section>
  );
}

export default LeadsPage;
