import { traineesApi } from "../../../redux/api/hooksAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm, { TraineeWithMemberProps } from "./TraineeForm";

export function TraineeAddForm() {
  const [addTrainee] = traineesApi.useCreateOneItemMutation();
  const handleSubmit = (body: TraineeWithMemberProps) => {
    addFunction({
      addItem: addTrainee,
    })(body);
  };

  return <TraineeForm onSubmit={handleSubmit}></TraineeForm>;
}

export default TraineeAddForm;
