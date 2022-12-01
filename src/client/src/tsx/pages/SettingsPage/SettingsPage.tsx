import React from "react";

import useCheckRole from "../../hooks/useCheckRole";
import BusinessDataPage from "./BusinessDataPage";

function SettingsPage() {
  const { isTrainee } = useCheckRole();
  if (isTrainee) return <>Coming soon </>;

  return <BusinessDataPage />;
}

export default SettingsPage;
