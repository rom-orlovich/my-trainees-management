import { ChangeEvent, useEffect, useState } from "react";

import { Link, useParams, useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../components/baseComponents/RHF-Components/SelectInput/SelectInput";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";
import style from "./FinancesPage.module.scss";
import useOnChangeInput from "../../hooks/useOnChangeInput";

import IncomesTable from "./IncomesTable";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import ExpensesTable from "./ExpensesTable";

export type QueriesOptionsPropsWithNameData = { nameData?: string } & {
  queriesOptions?: Record<string, any>;
};
const displayOptions = [
  { label: "Incomes", value: "incomes" },
  { label: "Expenses", value: "expenses" },
];

function FinancesPage() {
  const authState = useGetUserLoginData();

  const [{ gt, lt, display }, onChange] = useOnChangeInput({
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
            LabelProps={{ labelText: "Date Start", htmlFor: "gt" }}
            InputProps={{ type: "date", onChange }}
          />
          <InputLabel
            LabelProps={{ labelText: "Date End", htmlFor: "lt" }}
            InputProps={{ type: "date", onChange }}
          />
        </span>

        <span className={style.add_change_display_container}>
          <SelectInput
            LabelProps={{ labelText: "Display", htmlFor: "display" }}
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

export default FinancesPage;
