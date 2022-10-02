import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformTrainingProgramList = ({
  trainee_id,
  note_text,
  note_topic,
  training_programs_list_id,
  type_program,
  ...rest
}: TrainingProgramsListTableAPI) => {
  return {
    training_programs_list_id,
    type_program: (
      <Link
        to={`${training_programs_list_id}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
      >
        {type_program}
      </Link>
    ),
    ...rest,
  };
};

function TableTrainingProgramList({
  traineeID,
  queriesOptions,
}: { traineeID: number } & { queriesOptions?: Record<string, any> }) {
  const [deleteItem] = trainingProgramsListApi.useDeleteItemMutation();
  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ traineeID, ...queriesOptions }}
      mainRoute={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}`}
      nameData="Training Program List"
      getAllQuery={trainingProgramsListApi.useGetItemsQuery}
    />
  );
}

export default TableTrainingProgramList;
