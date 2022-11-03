import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { participantsGroupsListApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupsListTableAPI } from "../../redux/api/interfaceAPI";
import ParticipantsGroupsListTable from "./ParticipantsGroupsListTable";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";

import useGetUserLoginData from "../../hooks/useGetUserLoginData";

function ParticipantsGroupsListPage() {
  const { user_id } = useGetUserLoginData();
  const [participantsGroupsList, setParticipantsGroupsList] = useState<
    string[]
  >(["", ""]);

  const queriesOptions = {
    userID: user_id,
    // programType: trainingProgram[1],
    // trainerUserID: authState.user?.user_id,

    // orderBy: "updateDate",
    // asc: "false",
  };

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<ParticipantsGroupsListTableAPI>
          keys={["group_name"]}
          id={"participants_groups_list_id"}
          loadingSpinnerResult={{ nameData: "Participants Group" }}
          setSelectOptionValue={setParticipantsGroupsList}
          queriesOptions={queriesOptions}
          useGetData={participantsGroupsListApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Participants Group" },
            LabelProps: {
              labelText: "Search Group",
              htmlFor: "searchGroup",
            },
          }}
        />

        <span>
          {
            <Link
              to={`/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}
            >
              Add Participants Group
            </Link>
          }
        </span>
      </div>
      <div className={style.page_main_content}>
        <ParticipantsGroupsListTable
          mainName={participantsGroupsList[1]}
          queriesOptions={queriesOptions}
        />
      </div>
    </section>
  );
}

export default ParticipantsGroupsListPage;
