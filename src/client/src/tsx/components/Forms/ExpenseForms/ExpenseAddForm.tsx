import { expenseApi, financesApi } from "../../../redux/api/hooksAPI";
import { ExpensesTableAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ExpenseForms } from "./ExpenseForms";

export function ExpenseAddForm() {
  const [addItem] = expenseApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = ({
    product_name,
    expense_id,
    ...body
  }: ExpensesTableAPI) =>
    addFunction({
      addItem,
    })(body).then(() => {
      dispatch(financesApi.util.invalidateTags(["finances_list"]));
    });

  return <ExpenseForms onSubmit={handleSubmit} />;
}
