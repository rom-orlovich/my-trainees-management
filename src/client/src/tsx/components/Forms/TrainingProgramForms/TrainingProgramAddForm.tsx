import { useParams } from "react-router-dom";
import { trainingProgramsApi } from "../../../redux/api/hooksAPI";
import { TrainingProgramExerciseOmit } from "../../../redux/api/interfaceAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TrainingProgramForms from "./TrainingProgramForm";

export function TrainingProgramAddExerciseForm() {
  const id = Number(useParams().id);
  const [addItem] = trainingProgramsApi.useCreateOneItemMutation();

  const handleSubmit = (body: TrainingProgramExerciseOmit) => {
    addFunction({
      addItem,
    })({ ...body, training_programs_list_id: id });
  };

  return (
    <TrainingProgramForms
      defaultValues={
        {
          training_programs_list_id: id,
        } as TrainingProgramExerciseOmit
      }
      onSubmit={handleSubmit}
    ></TrainingProgramForms>
  );
}
