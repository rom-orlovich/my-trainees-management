import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { participantsGroupsListApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupsListTableAPI } from "../../redux/api/interfaceAPI";
import ParticipantsGroupsListTable from "./ParticipantsGroupsListTable";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";

import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

function ParticipantsGroupsListPage() {
  const dispatch = useAppDispatch();
  const { user_id } = useGetUserLoginData();
  const [participantsGroupsList, setParticipantsGroupsList] = useState<
    string[]
  >(["", ""]);

  const queriesOptions = {
    userID: user_id,
  };

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}
    >
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
            {/* <Link to={`${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE_ADD}`}>
              Add Participants Group //{" "}
            </Link> */}
            <Link
              onClick={() => {
                dispatch(
                  openModel({ displayContent: "participantsGroupsListForm" })
                );
              }}
              to={``}
            >
              Add Participants Group
            </Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <ParticipantsGroupsListTable
            mainName={participantsGroupsList[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ParticipantsGroupsListPage;
