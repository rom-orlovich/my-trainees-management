import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsListApi } from "../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

const transformTrainingProgramList = ({
  profile_id,

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

function TableTrainingProgramList({ traineeID }: { traineeID: number }) {
  const [deleteItem] = trainingProgramsListApi.useDeleteItemMutation();
  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ traineeID }}
      mainRoute={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}`}
      nameData="Training Program List"
      getAllQuery={trainingProgramsListApi.useGetItemsQuery}
    />
  );
}

export default TableTrainingProgramList;
