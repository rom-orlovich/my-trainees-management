import { RouteObject } from "react-router-dom";
import { ExpenseAddForm } from "../../components/Forms/ExpenseForms/ExpenseAddForm";
import ExpenseEditForm from "../../components/Forms/ExpenseForms/ExpenseEditForm";
import { IncomeAddForm } from "../../components/Forms/IncomeForms/IncomeAddForm";
import IncomeEditForm from "../../components/Forms/IncomeForms/IncomeEditForm";
import { LeadAddForm } from "../../components/Forms/LeadForms/LeadAddForm";
import LeadEditForm from "../../components/Forms/LeadForms/LeadEditForm";
import FinancesPage from "../../pages/FinancesPage/FinancesPage";
import LeadsPage from "../../pages/LeadsPage/LeadsPage";
import { APP_ROUTE } from "../appRoutesConstants";
import { AdminOrTrainerProtectedRoutes } from "../utilities/ProtectedRoute";
import { settingsRoutes } from "./adminOrTrainerProtectedRoutes/settingsRoutes";
import { traineesRoutes } from "./adminOrTrainerProtectedRoutes/traineesRoutes";

export const s: RouteObject = {
  path: "",
  element: <></>,
  children: [],
};

export const leadsRoutes: RouteObject = {
  path: APP_ROUTE.LEADS_ROUTE,
  element: <LeadsPage />,
  children: [
    {
      path: APP_ROUTE.LEADS_ROUTE_ADD,
      element: <LeadAddForm />,
    },
    {
      path: ":leadID",
      element: <LeadEditForm />,
    },
  ],
};

export const incomesRoutes: RouteObject = {
  path: APP_ROUTE.INCOMES_ROUTE,
  children: [
    {
      path: APP_ROUTE.INCOMES_ADD,
      element: <IncomeAddForm />,
    },
    {
      path: ":incomeID",
      element: <IncomeEditForm />,
    },
  ],
};
export const expensesRoutes: RouteObject = {
  path: APP_ROUTE.EXPENSES_ROUTE,
  children: [
    {
      path: APP_ROUTE.EXPENSES_ADD,
      element: <ExpenseAddForm />,
    },
    {
      path: ":expenseID",
      element: <ExpenseEditForm />,
    },
  ],
};
export const financesRoutes: RouteObject = {
  path: APP_ROUTE.FINANCES_ROUTE,
  element: <FinancesPage />,
  children: [incomesRoutes, expensesRoutes],
};

export const adminOrTrainerProtectedRoutes: RouteObject = {
  path: "",
  element: <AdminOrTrainerProtectedRoutes />,
  children: [settingsRoutes, traineesRoutes, leadsRoutes, financesRoutes],
};
