import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import style from "./SubscriptionStatus.module.scss";
function SubscriptionStatus() {
  return (
    <Card>
      <div className={style.subscription_status}></div>
    </Card>
  );
}

export default SubscriptionStatus;
