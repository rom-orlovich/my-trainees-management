import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { musclesGroupApi } from "../../redux/api/hooksAPI";
import { MusclesGroupTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import page_style from "../Page.module.scss";
import MusclesGroupTable from "./MusclesGroupTable";

function MusclesGroupPage() {
  const [musclesGroup, setMusclesGroup] = useState<string[]>(["", ""]);
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}
    >
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<MusclesGroupTableAPI>
            keys={["muscles_group_name"]}
            id={"muscles_group_id"}
            loadingSpinnerResult={{ nameData: "Muscles Group" }}
            setSelectOptionValue={setMusclesGroup}
            useGetData={musclesGroupApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Muscles Group Name" },
              LabelProps: {
                labelText: "Search Muscles Group",
                htmlFor: "musclesGroupsSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.MUSCLES_GROUP_ADD}`}>Add Muscles Group</Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <MusclesGroupTable mainName={musclesGroup[1]} />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default MusclesGroupPage;
