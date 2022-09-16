import { traineesApi } from "../../../redux/api/hooksAPI";
import { TraineesTableAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";

export function TraineeAddForm() {
  const [addTrainee] = traineesApi.useCreateOneItemMutation();
  const handleSubmit = (body: TraineesTableAPI) => {
    addFunction({
      addItem: addTrainee,
    })(body);
  };

  return <TraineeForm onSubmit={handleSubmit}></TraineeForm>;
}

export default TraineeAddForm;
