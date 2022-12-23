/* eslint-disable camelcase */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { participantsGroupApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupTableAPI } from "../../redux/api/interfaceAPI";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";

import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import ParticipantsGroupTable from "./ParticipantsGroupTable";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

function ParticipantsGroupPage() {
  const dispatch = useAppDispatch();
  const { user_id } = useGetUserLoginData();
  const participantsGroupsListID = String(useParams().participantGroupID);
  const [participantsGroup, setParticipantsGroups] = useState<string[]>([
    "",
    "",
  ]);

  const queriesOptions = {
    userID: user_id,
    participantsGroupsListID,
  };

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}
    >
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<ParticipantsGroupTableAPI>
            keys={["first_name", "last_name"]}
            id={"participants_group_id"}
            loadingSpinnerResult={{ nameData: "Participant" }}
            setSelectOptionValue={setParticipantsGroups}
            queriesOptions={queriesOptions}
            useGetData={participantsGroupApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Participant" },
              LabelProps: {
                labelText: "Search Participant",
                htmlFor: "searchParticipant",
              },
            }}
          />

          <span>
            {/* <Link to={`${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE_ADD}`}>
            Add Participant 
            </Link> */}
            <Link
              onClick={() => {
                dispatch(openModel({ displayContent: "participantForm" }));
              }}
              to={``}
            >
              Add Participant
            </Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <ParticipantsGroupTable
            mainName={participantsGroup[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ParticipantsGroupPage;
