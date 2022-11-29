/* eslint-disable camelcase */

import { Link } from "react-router-dom";
import Card from "../../../../components/baseComponents/Card/Card";
import { SelectInput } from "../../../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import useOnChangeInput from "../../../../hooks/useOnChangeInput";

import { trainingProgramsListApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import NutritionMenuList from "./NutritionMenuList/NutritionMenuList";

import style from "./ProgramsList.module.scss";

import TrainingProgramsList from "./TrainingProgramsList/TrainingProgramsList";

export const TRAINING_PROGRAMS_LIST_NAME = "Training Programs";
export const NUTRITION_MENUS_LIST_NAME = "Nutrition Menus";

export const PROGRAM_LIST_OPTIONS = [
  {
    label: TRAINING_PROGRAMS_LIST_NAME,
    value: TRAINING_PROGRAMS_LIST_NAME,
  },
  {
    label: NUTRITION_MENUS_LIST_NAME,
    value: NUTRITION_MENUS_LIST_NAME,
  },
];
function ProgramsList({ className, queryOptions }: TraineeProfileProps) {
  const [stateSelectInput, onChangeSelectInput] = useOnChangeInput({
    display: TRAINING_PROGRAMS_LIST_NAME,
  });
  return (
    <Card className={genClassName(className, style.programs_container)}>
      <SelectInput
        selectProps={{
          onChange: onChangeSelectInput,
          id: "display",
          value: stateSelectInput.display,
        }}
        LabelProps={{ labelText: "" }}
        options={PROGRAM_LIST_OPTIONS}
      />
      {stateSelectInput.display === TRAINING_PROGRAMS_LIST_NAME ? (
        <TrainingProgramsList queryOptions={queryOptions} />
      ) : (
        <NutritionMenuList queryOptions={queryOptions} />
      )}
    </Card>
  );
}

export default ProgramsList;
