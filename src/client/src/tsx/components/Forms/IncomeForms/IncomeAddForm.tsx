import { incomesApi } from "../../../redux/api/hooksAPI";
import { IncomeAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import IncomeForms from "./IncomeForms";

export function IncomeAddForm() {
  const [addItem] = incomesApi.useCreateOneItemMutation();
  // const { profileID } = useGetUserTraineeData();

  const handleSubmit = (body: IncomeAPI) => {
    console.log(body);
    return addFunction({
      addItem,
    })({ ...body });
  };

  return <IncomeForms onSubmit={handleSubmit} />;
}
