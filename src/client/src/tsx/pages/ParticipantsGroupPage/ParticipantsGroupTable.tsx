/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import {
  participantsGroupApi,
  participantsGroupsListApi,
} from "../../redux/api/hooksAPI";
import {
  ParticipantsGroupsListTableAPI,
  ParticipantsGroupTableAPI,
} from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformParticipantsGroup = ({
  first_name,
  last_name,
  participants_group_id,
}: ParticipantsGroupTableAPI) => ({
  participants_group_id,
  first_name,
  last_name,
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
