import { leadsApi, trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import LeadForm, { LeadsFormProps } from "./LeadForm";

export function LeadAddForm() {
  const [addItem] = leadsApi.useCreateNewComplexDataMutation();

  const handleSubmit = (body: LeadsFormProps) => {
    addFunction({
      addItem,
    })({ ...body });
  };

  return <LeadForm onSubmit={handleSubmit}></LeadForm>;
}
