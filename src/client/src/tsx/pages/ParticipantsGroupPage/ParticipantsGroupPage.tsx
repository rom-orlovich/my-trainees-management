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
import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

function ParticipantsGroup() {
  const dispatch = useAppDispatch();
  const { user_id } = useGetUserLoginData();
  const participantsGroupsListID = String(useParams().participantGroupListID);
  const [participantsGroup, setParticipantsGroups] = useState<string[]>([
    "",
    "",
  ]);

  const queriesOptions = {
    userID: user_id,
    participantsGroupsListID,
  };

  return (
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
  );
}

export default function ParticipantsGroupPage() {
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}
    >
      <ParticipantsGroup />
    </InsteadOutletRoutes>
  );
}
