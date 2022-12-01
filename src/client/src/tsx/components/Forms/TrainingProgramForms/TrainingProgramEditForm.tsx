/* eslint-disable camelcase */
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { API_ROUTES } from "../../../redux/api/apiRoutes";
import {
  trainingProgramsApi,
  trainingProgramsListApi,
} from "../../../redux/api/hooksAPI";
import { TrainingProgramExerciseOmit } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TrainingProgramForms from "./TrainingProgramForm";

export function TrainingProgramEditExerciseForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();
  const dispatch = useAppDispatch();

  const queriesOptions = { userID: authState.user_id };

  const { data, isLoading, isFetching, isError } =
    trainingProgramsApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: TrainingProgramExerciseOmit) =>
    updateFunction({
      updateItem,
      id,
    })(body).then(() => {
      dispatch(
        trainingProgramsApi.util.invalidateTags([
          { type: "exerciseStats", id: "exerciseStatsList" },
        ])
      );
      dispatch(
        trainingProgramsListApi.util.invalidateTags([
          {
            type: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
            id: "training_programs_list",
          },
        ])
      );
    });

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
