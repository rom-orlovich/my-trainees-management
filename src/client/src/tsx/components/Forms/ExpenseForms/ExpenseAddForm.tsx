import { expenseApi } from "../../../redux/api/hooksAPI";
import { ExpensesTableAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ExpenseForms } from "./ExpenseForms";

export function ExpenseAddForm() {
  const [addItem] = expenseApi.useCreateOneItemMutation();

  const handleSubmit = ({
    product_name,
    expense_id,
    ...body
  }: ExpensesTableAPI) =>
    addFunction({
      addItem,
    })(body);

  return <ExpenseForms onSubmit={handleSubmit} />;
}
