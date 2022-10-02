import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { leadsApi } from "../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import LeadsTable from "./LeadsTable";

function LeadsPage() {
  const [lead, setLead] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = { userID: authState.user?.user_id };
  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<LeadsTableAPI>
          keys={["first_name", "last_name"]}
          id={"lead_id"}
          queriesOptions={{ ...queriesOptions }}
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
      <div className={page_style.page_main_content}>
        <LeadsTable mainName={lead[1]} />
      </div>
    </section>
  );
}

export default LeadsPage;
