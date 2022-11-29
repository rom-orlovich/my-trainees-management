/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

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
  program_type,
  update_date,
  ...rest
}: TrainingProgramsListTableAPI) => ({
  training_programs_list_id,
  program_type: (
    <Link
      to={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${training_programs_list_id}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}?program=${program_type}`}
    >
      {program_type}
    </Link>
  ),
  ...rest,
});
function TrainingProgramsTable({
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
      nameData={nameData || "Training Program"}
      getAllQuery={trainingProgramsListApi.useGetItemsQuery}
    />
  );
}

export default TrainingProgramsTable;
