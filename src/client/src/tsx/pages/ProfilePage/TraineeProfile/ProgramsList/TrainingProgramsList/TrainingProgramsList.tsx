import React from "react";
import { Link } from "react-router-dom";
import { trainingProgramsListApi } from "../../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../../routes2/appRoutesConstants";
import ListProfile from "../../../ListProfile/ListProfile";
import { TraineeProfileProps } from "../../TraineeProfile";
import { TRAINING_PROGRAMS_LIST_NAME } from "../ProgramsList";
import TrainingProgramsLi from "./TrainingProgramsLi";

function TrainingProgramsList({ queryOptions }: TraineeProfileProps) {
  const trainingProgramsListPageLink = `/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}?traineeID=${queryOptions?.traineeID}`;
  return (
    <ListProfile
      dataNotFoundEl={
        <Link to={trainingProgramsListPageLink}>
          {TRAINING_PROGRAMS_LIST_NAME} Page
        </Link>
      }
      LI={TrainingProgramsLi}
      useQuery={trainingProgramsListApi.useGetItemsQuery}
      heading={TRAINING_PROGRAMS_LIST_NAME}
      queryOptions={queryOptions}
      pagePath={trainingProgramsListPageLink}
    />
  );
}

export default TrainingProgramsList;
