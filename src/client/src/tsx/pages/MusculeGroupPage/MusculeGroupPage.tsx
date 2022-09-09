import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { musculesGroupApi } from "../../redux/api/hooksAPI";
import { MusculesGroupTable as MusclesGroupTableAPi } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";

import { APP_ROUTE } from "../../routes/routesConstants";
import page_style from "../Page.module.scss";
import MusculesGroupTable from "./MusculeGroupTable";

function MusculesGroupPage() {
  const [musclesGroup, setMusclesGroup] = useState<string[]>(["", ""]);
  return (
    <MainRoute mainRoutes={APP_ROUTE.MUSCULES_GROUP_LIST_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<MusclesGroupTableAPi>
            keys={["muscules_group_name"]}
            id={"muscules_group_id"}
            loadingSpinnerResult={{ nameData: "Muscules Group" }}
            setSelectOptionValue={setMusclesGroup}
            useGetData={musculesGroupApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Muscules Group Name" },
              LabelProps: {
                labelText: "Search Muscules Group",
                htmlFor: "musclesGroupsSearch",
              },
            }}
          />

          <span>
            <Link to={`${APP_ROUTE.MUSCULES_GROUP_ADD}`}>
              Add Muscules Group
            </Link>
          </span>
        </div>
        <div className={page_style.page_main_content}>
          <MusculesGroupTable name={musclesGroup[1]} />
        </div>
      </section>
    </MainRoute>
  );
}

export default MusculesGroupPage;
