/* eslint-disable camelcase */
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import { useParams } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import { SelectInput } from "../../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";

import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { trainingProgramsListApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import ProgramsProfileContent from "./ProgramContent";

import style from "./Programs.module.scss";
import TrainingProgramsLi from "./TrainingProgramsLi";

function Programs({ className, queryOptions }: TraineeProfileProps) {
  return (
    <Card className={genClassName(className, style.programs_container)}>
      <SelectInput
        selectProps={{}}
        LabelProps={{ labelText: "" }}
        options={[
          { label: "Training Programs", value: "Training Programs" },
          { label: "Nutrition Programs", value: "Nutrition Programs" },
        ]}
      ></SelectInput>
      <ProgramsProfileContent
        LI={TrainingProgramsLi}
        useQuery={trainingProgramsListApi.useGetItemsQuery}
        heading={"Training Programs"}
        queryOptions={queryOptions}
      />
    </Card>
  );
}

export default Programs;
