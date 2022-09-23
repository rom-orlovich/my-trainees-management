import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { alertsApi } from "../../../../redux/api/hooksAPI";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import DropDown from "../DropDown/DropDown";
import style from "./AlertsNotification.module.scss";
interface AlertsNotificationProps extends PropsBasic {}

function DropDownLiAlert(props: { data: AlertsAPI } & PropsBasic) {
  return (
    <li className={`${style.notification_li} ${props.className}`}>
      <div>
        <h3>Text </h3>
        <div>{props.data.alert_message} </div>
      </div>
      <div>
        <h3>Date</h3>
        <div>{new Date(props.data.alert_date).toLocaleDateString()}</div>
      </div>
    </li>
  );
}

function AlertsNotification({ className }: AlertsNotificationProps) {
  const { data } = alertsApi.useGetItemsQuery(
    {
      page: 1,
    },
    { pollingInterval: 2 * 60 * 1000 }
  );

  return (
    <DropDown dataLI={data?.data || []} Li={DropDownLiAlert}>
      <IoMdNotifications className={className} />
    </DropDown>
  );
}

export default AlertsNotification;
