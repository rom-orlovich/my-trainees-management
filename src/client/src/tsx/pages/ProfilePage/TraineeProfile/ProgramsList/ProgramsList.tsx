/* eslint-disable camelcase */
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import Card from "../../../../components/baseComponents/Card/Card";
import { SelectInput } from "../../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

import { trainingProgramsListApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import ListProfile from "../../ListProfile";

import TrainingProgramsLi from "./TrainingProgramsLi";
import listProfileStyle from "../../ListProfile.module.scss";
import style from "./ProgramsList.module.scss";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";

function ProgramsList({ className, queryOptions }: TraineeProfileProps) {
  return (
    <Card
      className={genClassName(
        className,
        listProfileStyle.list_container,
        style.programs_container
      )}
    >
      <SelectInput
        selectProps={{}}
        LabelProps={{ labelText: "" }}
        options={[
          { label: "Training Programs", value: "Training Programs" },
          { label: "Nutrition Programs", value: "Nutrition Programs" },
        ]}
      />
      <ListProfile
        LI={TrainingProgramsLi}
        useQuery={trainingProgramsListApi.useGetItemsQuery}
        heading={"Training Programs"}
        queryOptions={queryOptions}
        pagePath={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}?traineeID=${queryOptions?.traineeID}`}
      />
    </Card>
  );
}

export default ProgramsList;
