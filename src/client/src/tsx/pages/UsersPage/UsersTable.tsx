import React from "react";
import { useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi, usersApi } from "../../redux/api/hooksAPI";
import { TraineesTableExtendsAPI, UserAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

export const transformDataUser = (arg: UserAPI) =>
  // const {
  //   profile_id,

  //   ...rest
  // } = arg;

  arg;

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
    <InsteadOutletRoutes InsteadOutletRoutesPaths={[APP_ROUTE.USERS_ROUTE, ""]}>
      <TablePagination<UserAPI>
        mainRoute={APP_ROUTE.USERS_ROUTE}
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Users"}
        transformFun={transformDataUser}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default UsersTable;
