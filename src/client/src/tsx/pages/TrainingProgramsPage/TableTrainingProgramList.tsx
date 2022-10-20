/* eslint-disable camelcase */
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformTrainingProgramList = ({
  trainee_id,
  note_text,
  note_topic,
  training_programs_list_id,
  type_program,
  ...rest
}: TrainingProgramsListTableAPI) => ({
  training_programs_list_id,
  type_program: (
    <Link
      to={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${training_programs_list_id}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
    >
      {type_program}
    </Link>
  ),
  ...rest,
});
function TableTrainingProgramList({
  traineeID,
  queriesOptions,
  nameData,
}: { traineeID: number; nameData?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const [deleteItem] = trainingProgramsListApi.useDeleteItemMutation();

  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ traineeID, ...queriesOptions }}
      editPagePath={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}`}
      nameData={nameData || "Training Program List"}
      getAllQuery={trainingProgramsListApi.useGetItemsQuery}
    />
  );
}

export default TableTrainingProgramList;
