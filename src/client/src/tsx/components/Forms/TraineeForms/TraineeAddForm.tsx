import { authApi } from "../../../redux/api/authAPI";
import { traineesApi } from "../../../redux/api/hooksAPI";
import { TraineesBaseTableAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";

export function TraineeAddForm() {
  const [addTrainee] = traineesApi.useRegisterTraineeMutation();
  const handleSubmit = (body: TraineesBaseTableAPI) => {
 
    addFunction({
      addItem: addTrainee,
    })(body);
  };

  return <TraineeForm onSubmit={handleSubmit}></TraineeForm>;
}

export default TraineeAddForm;
