import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { alertsApi } from "../../../../redux/api/hooksAPI";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { disableFetchAlerts } from "../../../../redux/slices/apiSideEffectSlice";
import DropDown from "../DropDown/DropDown";
import style from "./AlertsNotification.module.scss";
interface AlertsNotificationProps extends PropsBasic {}

function DropDownLiAlert(props: { data: AlertsAPI } & PropsBasic) {
  const [trigger] = alertsApi.useDeleteItemMutation();
  const deleteFun = () => {
    trigger && trigger(String(props.data.alert_id));
  };
  return (
    <li className={`${style.notification_li} ${props.className}`}>
      <div>
        <p className={style.alert_message}>
          {props.data.alert_message.split(".")[0]}
        </p>
        <p className={style.date}>
          {new Date(props.data.alert_date).toLocaleString()}{" "}
        </p>
      </div>

      <IoMdRemoveCircle onClick={deleteFun} className={style.deleteIcon} />
    </li>
  );
}

function AlertsNotification({ className }: AlertsNotificationProps) {
  const { data, refetch } = alertsApi.useGetItemsQuery({
    page: 1,
    numResults: 5,
    asc: false,
  });
  const fetchAlerts = useAppSelector(
    (state) => state.apiSideEffect.fetchAlerts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetchAlerts) {
      refetch();
      dispatch(disableFetchAlerts());
    }
  }, [fetchAlerts, dispatch]);

  return (
    <DropDown
      dataLI={data?.data || []}
      Li={DropDownLiAlert}
      messageNotFound="No Alerts Are Found!"
    >
      <IoMdNotifications className={className} />
    </DropDown>
  );
}

export default AlertsNotification;
