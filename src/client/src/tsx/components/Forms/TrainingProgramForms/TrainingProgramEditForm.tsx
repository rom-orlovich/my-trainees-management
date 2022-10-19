/* eslint-disable camelcase */
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { trainingProgramsApi } from "../../../redux/api/hooksAPI";
import { TrainingProgramExerciseOmit } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TrainingProgramForms from "./TrainingProgramForm";

export function TrainingProgramEditExerciseForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };

  const { data, isLoading, isFetching, isError } =
    trainingProgramsApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: TrainingProgramExerciseOmit) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Training Programs"
      stateData={{
        data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {({ equipment_name, muscles_group_name, exercise_name, ...rest }) => (
        <TrainingProgramForms
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={rest}
        />
      )}
    </LoadingSpinner>
  );
}
