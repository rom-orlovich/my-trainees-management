import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

import { citiesApi } from "../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataCity = (arg: CitiesTableAPI) => {
  const { city_name, city_id, ...rest } = arg;

  return { city_id, city: city_name, ...rest };
};
function CitiesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = citiesApi;

  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.CITY_ROUTE}>
      <TablePagination<CitiesTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Cities List"}
        getAllQuery={useGetItemsQuery}
        transformFun={transformDataCity}
        deleteItemFun={
          useGetUserLoginData().authState.user?.role === "admin"
            ? (id) => deleteFunMutation(id, deleteItem)
            : undefined
        }
      />
    </InsteadOutletRoutes>
  );
}

export default CitiesTable;
