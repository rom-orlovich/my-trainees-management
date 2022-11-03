/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { participantsGroupsListApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupsListTableAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformParticipantsGroupsList = ({
  group_name,
  participants_groups_list_id,
  is_private: isPublic,
}: ParticipantsGroupsListTableAPI) => ({
  participants_groups_list_id,
  group_name: (
    <Link
      to={`${participants_groups_list_id}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
    >
      {group_name}
    </Link>
  ),
  isPublic,
});
function ParticipantsGroupsListTable({
  queriesOptions,
  mainName,
}: { mainName?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const [deleteItem] = participantsGroupsListApi.useDeleteItemMutation();

  return (
    <TablePagination
      transformFun={transformParticipantsGroupsList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ mainName, ...queriesOptions }}
      nameData={"Participants Groups"}
      getAllQuery={participantsGroupsListApi.useGetItemsQuery}
    />
  );
}

export default ParticipantsGroupsListTable;
