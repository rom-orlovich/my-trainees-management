import { leadsApi, trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../../redux/api/interfaceAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import LeadForm from "./LeadForm";

export function LeadAddForm() {
  const [addItem] = leadsApi.useCreateOneItemMutation();

  const handleSubmit = (body: LeadsTableAPI) => {
    addFunction({
      addItem,
    })({ ...body });
  };

  return <LeadForm onSubmit={handleSubmit}></LeadForm>;
}
