/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

import { activitiesApi, musclesGroupApi } from "../../redux/api/hooksAPI";
import {
  ActivitiesTableAPI,
  MusclesGroupTableAPI,
} from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";
import { useAppDispatch } from "../../redux/hooks";

const transformActivity = ({
  activity_id,
  activity_name,
}: ActivitiesTableAPI) => ({
  activity_id,
  activity: activity_name,
});

function ActivitiesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = activitiesApi;
  const [deleteItem] = useDeleteItemMutation();
  const dispatch = useAppDispatch();
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.ACTIVITIES_ROUTE}>
      <TablePagination<MusclesGroupTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        transformFun={transformActivity}
        nameData={"Activity"}
        openEditModel={(id) => {
          dispatch(openModel({ displayContent: "activityForm", curParam: id }));
        }}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={
          useGetUserLoginData().authState.user?.role === "trainer"
            ? (id) => deleteFunMutation(id, deleteItem)
            : undefined
        }
      />
    </InsteadOutletRoutes>
  );
}

export default ActivitiesTable;
