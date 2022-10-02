import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { locationsApi } from "../../redux/api/hooksAPI";
import { LocationsGetRes } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataLocation = (arg: LocationsGetRes) => {
  const { city_id, ...rest } = arg;

  return rest;
};
function LocationsTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = locationsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.LOCATION_ROUTE}>
      <TablePagination<LocationsGetRes>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Locations List"}
        transformFun={transformDataLocation}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default LocationsTable;
