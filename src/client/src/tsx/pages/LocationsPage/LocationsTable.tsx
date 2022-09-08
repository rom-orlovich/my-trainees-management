import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";

import { locationsApi } from "../../redux/api/hooksAPI";
import { LocationsGetRes } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const tranformDataLocation = (arg: LocationsGetRes) => {
  const { city_id, ...rest } = arg;

  return rest;
};
function LocationsTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = locationsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.LOCATION_ROUTE}>
      <TablePagniation<LocationsGetRes>
        queriesOptions={{ name }}
        nameData={"Locations List"}
        transformFun={tranformDataLocation}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default LocationsTable;
