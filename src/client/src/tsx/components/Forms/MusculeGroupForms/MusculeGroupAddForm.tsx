import { musculesGroupApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MusculeGroupForm } from "./MusculeGroupForm";

export function MusculeGroupAddForm() {
  const [addItem] = musculesGroupApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <MusculeGroupForm onSubmit={handleSubmit}></MusculeGroupForm>;
}
