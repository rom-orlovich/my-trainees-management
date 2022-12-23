/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { locationsApi } from "../../redux/api/hooksAPI";
import { LocationsGetRes } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes2/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

export const transformDataLocation = (arg: LocationsGetRes) => {
  const { city_id, location_id, city_name, user_id, ...rest } = arg;

  return { location_id, city: city_name, ...rest };
};
function LocationsTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const dispatch = useAppDispatch();
  const { useGetItemsQuery, useDeleteItemMutation } = locationsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.LOCATION_ROUTE}>
      <TablePagination<LocationsGetRes>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Locations List"}
        openEditModel={(id) => {
          dispatch(openModel({ displayContent: "locationForm", curParam: id }));
        }}
        transformFun={transformDataLocation}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default LocationsTable;
