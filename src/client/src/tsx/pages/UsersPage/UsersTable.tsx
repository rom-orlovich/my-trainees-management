import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { usersApi } from "../../redux/api/hooksAPI";
import { User } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

export const transformDataUser = ({
  profile_id,
  trainer_user_id,
  trainee_id,
  ...rest
}: User) => rest;

export interface PageTableProps {
  mainName?: string;
}
function UsersTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = usersApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <TablePagination<User>
      editPagePath={APP_ROUTE.USERS_ROUTE}
      queriesOptions={{ mainName, ...queriesOptions }}
      nameData={"Users"}
      actions={{ delete: false, edit: false }}
      transformFun={transformDataUser}
      getAllQuery={useGetItemsQuery}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
    />
  );
}

export default UsersTable;
