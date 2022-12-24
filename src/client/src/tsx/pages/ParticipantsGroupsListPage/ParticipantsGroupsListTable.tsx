/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { participantsGroupsListApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupsListTableAPI } from "../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformParticipantsGroupsList = ({
  group_name,
  participants_groups_list_id,
  is_private,
}: ParticipantsGroupsListTableAPI) => ({
  participants_groups_list_id,
  group_name: (
    <Link
      to={`${participants_groups_list_id}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
    >
      {group_name}
    </Link>
  ),
  [`is_private?`]: is_private ? "private" : "public",
});
function ParticipantsGroupsListTable({
  queriesOptions,
  mainName,
}: { mainName?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const dispatch = useAppDispatch();
  const [deleteItem] = participantsGroupsListApi.useDeleteItemMutation();

  return (
    <TablePagination
      transformFun={transformParticipantsGroupsList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      openEditModel={(id) => {
        dispatch(
          openModel({
            displayContent: "participantsGroupsListForm",
            curParam: id,
          })
        );
      }}
      queriesOptions={{ mainName, ...queriesOptions }}
      nameData={"Participants Groups"}
      getAllQuery={participantsGroupsListApi.useGetItemsQuery}
    />
  );
}

export default ParticipantsGroupsListTable;
