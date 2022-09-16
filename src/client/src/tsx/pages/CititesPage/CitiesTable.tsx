import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { citiesApi, locationsApi } from "../../redux/api/hooksAPI";
import { CitiesTable as CitiesTableInterface } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function CitiesTable({ mainName }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = citiesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.CITY_ROUTE}>
      <TablePagination<CitiesTableInterface>
        queriesOptions={{ mainName }}
        nameData={"Cities List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default CitiesTable;
