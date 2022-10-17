import React from "react";
import { Link, Navigate } from "react-router-dom";

import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { genClassName } from "../../utilities/helpersFun";
import style from "./SettingsPage.module.scss";
import useCheckRole from "../../hooks/useCheckRole";
import BushinessDataPage from "./BushinessDataPage";

function SettingsPage() {
  const { isTrainee } = useCheckRole();

  if (!isTrainee) {
    return <BushinessDataPage />;
  }
  return <>Coming soon</>;
}
export default SettingsPage;
