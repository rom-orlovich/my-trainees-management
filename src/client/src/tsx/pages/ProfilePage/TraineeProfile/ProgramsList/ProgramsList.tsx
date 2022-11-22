/* eslint-disable camelcase */

import { Link } from "react-router-dom";
import Card from "../../../../components/baseComponents/Card/Card";
import { SelectInput } from "../../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

import { trainingProgramsListApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import ListProfile from "../../ListProfile/ListProfile";

import TrainingProgramsLi from "./TrainingProgramsLi";

import style from "./ProgramsList.module.scss";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";

function ProgramsList({ className, queryOptions }: TraineeProfileProps) {
  const trainingProgramsName = "Training Programs";
  const trainingProgramLink = `/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}?traineeID=${queryOptions?.traineeID}`;
  return (
    <Card
      className={genClassName(
        className,

        style.programs_container
      )}
    >
      <SelectInput
        selectProps={{}}
        LabelProps={{ labelText: "" }}
        options={[
          { label: trainingProgramsName, value: trainingProgramsName },
          { label: "Nutrition Programs", value: "Nutrition Programs" },
        ]}
      />
      <ListProfile
        dataNotFoundEl={
          <Link to={trainingProgramLink}>{trainingProgramsName} Page</Link>
        }
        LI={TrainingProgramsLi}
        useQuery={trainingProgramsListApi.useGetItemsQuery}
        heading={trainingProgramsName}
        queryOptions={queryOptions}
        pagePath={trainingProgramLink}
      />
    </Card>
  );
}

export default ProgramsList;
