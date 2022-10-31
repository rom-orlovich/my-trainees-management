import { activitiesApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ActivityForm } from "./ActivityForm";

export function ActivityAddForm() {
  const [addItem] = activitiesApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <ActivityForm onSubmit={handleSubmit}></ActivityForm>;
}
