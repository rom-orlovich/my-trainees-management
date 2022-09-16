import { musclesGroupApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MusclesGroupForm } from "./MusclesGroupForm";

export function MusclesGroupAddForm() {
  const [addItem] = musclesGroupApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <MusclesGroupForm onSubmit={handleSubmit}></MusclesGroupForm>;
}
