/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { participantsGroupApi } from "../../redux/api/hooksAPI";
import { ParticipantsGroupTableAPI } from "../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlice";
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
  const dispatch = useAppDispatch();
  const [deleteItem] = participantsGroupApi.useDeleteItemMutation();

  return (
    <TablePagination
      openEditModel={(id) => {
        dispatch(
          openModel({ displayContent: "participantForm", curParam: id })
        );
      }}
      transformFun={transformParticipantsGroup}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ mainName, ...queriesOptions }}
      nameData={"Participant"}
      getAllQuery={participantsGroupApi.useGetItemsQuery}
    />
  );
}

export default ParticipantsGroupTable;
