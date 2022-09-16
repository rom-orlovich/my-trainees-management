import { useParams } from "react-router-dom";
import { trainingProgramsApi } from "../../../redux/api/hooksAPI";
import { TrainingProgramExerciseOmit } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TrainingProgramForms from "./TrainingProgramForm";

export function TrainingProgramEditExerciseForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsApi.useUpdateComplexItemMutation();

  const { data, isLoading, isFetching, isError } =
    trainingProgramsApi.useGetItemByIDQuery(id);

  const handleSubmit = (body: TrainingProgramExerciseOmit) => {
    updateFunction({
      updateItem,
      id,
    })(body);
  };

  return (
    <LoadingSpinner
      nameData="Training Programs"
      stateData={{
        data: data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {({ equipment_name, muscles_group_name, exercise_name, ...rest }) => {
        return (
          <TrainingProgramForms
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={rest}
          ></TrainingProgramForms>
        );
      }}
    </LoadingSpinner>
  );
}
