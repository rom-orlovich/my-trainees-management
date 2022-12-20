import React from "react";

import useCheckRole from "../../hooks/useCheckRole";
import ComingSoonPage from "../ComingSoonPage/ComingSoonPage";
import BusinessDataPage from "./BusinessDataPage";

function SettingsPage() {
  const { isTrainee } = useCheckRole();
  if (isTrainee) return <ComingSoonPage />;

  return <BusinessDataPage />;
}

export default SettingsPage;
