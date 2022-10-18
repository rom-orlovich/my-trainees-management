import React from "react";
import { Link } from "react-router-dom";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { genClassName } from "../../utilities/helpersFun";
import style from "./SettingsPage.module.scss";
import useCheckRole from "../../hooks/useCheckRole";
import BusinessDataPage from "./BusinessDataPage";

function SettingsPage() {
  const { isTrainee } = useCheckRole();
  if (isTrainee) return <>Coming soon </>;

  return <BusinessDataPage />;
}

export default SettingsPage;
