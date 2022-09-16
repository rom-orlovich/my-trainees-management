import { traineesApi } from "../../../redux/api/hooksAPI";
import { useAppSelector } from "../../../redux/hooks";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm, { TraineeWithMemberProps } from "./TraineeForm";

export function TraineeAddForm() {
  const state = useAppSelector((state) => state.tablesPaginationState);

  const [addTrainee] = traineesApi.useCreateOneItemMutation();
  const handleSubmit = (body: TraineeWithMemberProps) => {
    addFunction({
      addItem: addTrainee,
    })(body).then((value) => {
      // memeberApi's methods will trigger only the data of memeberApi.
      // Therefore the data of trainees will not refetch so, we need to trigger it manually.
    });
  };

  return <TraineeForm onSubmit={handleSubmit}></TraineeForm>;
}

export default TraineeAddForm;
