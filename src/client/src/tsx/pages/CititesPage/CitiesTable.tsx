import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";

import { citiesApi, locationsApi } from "../../redux/api/hooksAPI";
import { CitiesTable as CitiesTableInterface } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

// export const tranformDataCity = (arg: CitiesTableInterface) => {
//   const { ...rest } = arg;

//   return rest;
// };
function CitiesTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = citiesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.CITY_ROUTE}>
      <TablePagniation<CitiesTableInterface>
        // mainRoute={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
        queriesOptions={{ name }}
        nameData={"Cities List"}
        // transformFun={tranformDataCity}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default CitiesTable;
