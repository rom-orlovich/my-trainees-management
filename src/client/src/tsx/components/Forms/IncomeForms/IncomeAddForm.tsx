import { incomesApi, subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { API_ROUTES, IncomeAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import IncomeForms from "./IncomeForms";

export function IncomeAddForm() {
  const [addItem] = incomesApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = (body: IncomeAPI) => {
    console.log(body);
    return addFunction({
      addItem,
    })({ ...body }).then(() => {
      dispatch(
        subscriptionPlansApi.util.invalidateTags([
          {
            type: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
            id: "subscription_plans_list",
          },
        ])
      );
    });
  };

  return <IncomeForms onSubmit={handleSubmit} />;
}
