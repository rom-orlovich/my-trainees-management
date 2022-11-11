/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { participantsGroupApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupTableAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformParticipantsGroup = ({
  first_name,
  last_name,
  trainee_id,
  participants_group_id,
  username,
  profile_id,
}: ParticipantsGroupTableAPI) => ({
  participants_group_id,
  full_name: (
    <Link
      to={`/${APP_ROUTE.TRAINEES_ROUTE}/${trainee_id}/${APP_ROUTE.PROFILE_ROUTE}?profileID=${profile_id}&username=${username}`}
    >
      {`${first_name} ${last_name}`}
    </Link>
  ),
});
function ParticipantsGroupTable({
  queriesOptions,
  mainName,
}: { mainName?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const [deleteItem] = participantsGroupApi.useDeleteItemMutation();

  return (
    <TablePagination
      transformFun={transformParticipantsGroup}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ mainName, ...queriesOptions }}
      nameData={"Participant"}
      getAllQuery={participantsGroupApi.useGetItemsQuery}
    />
  );
}

export default ParticipantsGroupTable;
