import { Link } from "react-router-dom";

import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";
import style from "./FinancesPage.module.scss";
import useOnChangeInput from "../../hooks/useOnChangeInput";

import IncomesTable from "./IncomesTable";
import { APP_ROUTE } from "../../routes2/appRoutesConstants";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import ExpensesTable from "./ExpensesTable";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

export type QueriesOptionsPropsWithNameData = { nameData?: string } & {
  queriesOptions?: Record<string, any>;
};
const displayOptions = [
  { label: "Incomes", value: "incomes" },
  { label: "Expenses", value: "expenses" },
];

function Finances() {
  const authState = useGetUserLoginData();

  const [{ lt, gt, display }, onChange] = useOnChangeInput({
    gt: "",
    lt: "",
    display: "incomes",
  } as { gt: string; lt: string; display: "incomes" | "expenses" });

  const queriesOptions = { userID: authState.user_id, gt, lt };
  const content =
    display === "incomes" ? (
      <IncomesTable queriesOptions={queriesOptions} />
    ) : (
      <ExpensesTable queriesOptions={queriesOptions} />
    );

  const linkAddProps = {
    incomes: {
      text: "Income",
      link: `${APP_ROUTE.INCOMES_ROUTE}/${APP_ROUTE.INCOMES_ADD}`,
    },
    expenses: {
      text: "Expense",
      link: `${APP_ROUTE.EXPENSES_ROUTE}/${APP_ROUTE.EXPENSES_ADD}`,
    },
  };

  return (
    <section
      className={genClassName(
        page.page_container,
        style.finances_page_container
      )}
    >
      <div className={genClassName(page.page_header)}>
        <span className={page.dates_container}>
          <InputLabel
            LabelProps={{ labelText: "Date Start" }}
            InputProps={{ type: "date", onChange, id: "gt" }}
          />
          <InputLabel
            LabelProps={{ labelText: "Date End" }}
            InputProps={{ type: "date", onChange, id: "lt" }}
          />
        </span>

        <span className={style.add_change_display_container}>
          <SelectInput
            LabelProps={{ labelText: "", htmlFor: "display" }}
            selectProps={{ onChange, defaultValue: display }}
            options={displayOptions}
          />

          <span>
            <Link
              to={`${linkAddProps[display].link}`}
            >{`Add ${linkAddProps[display].text}`}</Link>
          </span>
        </span>
      </div>
      <div className={page.page_main_content}>{content}</div>
    </section>
  );
}

export default function FinancesPage() {
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.FINANCES_ROUTE}>
      <Finances />
    </InsteadOutletRoutes>
  );
}
