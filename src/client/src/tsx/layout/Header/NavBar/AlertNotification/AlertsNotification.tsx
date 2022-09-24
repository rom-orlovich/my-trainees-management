import React, { useEffect, useRef, useState } from "react";

import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import useHideUnFocusElement from "../../../../hooks/useHideUnFocusElement";

import { alertsApi } from "../../../../redux/api/hooksAPI";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { disableFetchAlerts } from "../../../../redux/slices/apiSideEffectSlice";
import DropDown from "../DropDown/DropDown";
import style from "./AlertsNotification.module.scss";
interface AlertsNotificationProps extends PropsBasic {}

function DropDownLiAlert(
  props: {
    data: AlertsAPI;
    setS?: React.Dispatch<React.SetStateAction<boolean>>;
  } & PropsBasic
) {
  const dropDownRef = useRef<HTMLLIElement | null>(null);

  const [trigger] = alertsApi.useDeleteItemMutation();
  const deleteFun = () => {
    props.setS && props.setS(true);
    trigger && trigger(String(props.data.alert_id));
  };

  return (
    <li
      ref={dropDownRef}
      className={`${style.notification_li} ${props.className}`}
    >
      <div>
        <p className={style.alert_message}>
          {props.data.alert_message.split(".")[0]},{" "}
          <span>{new Date(props.data.alert_date).toLocaleString()} </span>
        </p>
        {/* <p className={style.date}>
          {new Date(props.data.alert_date).toLocaleString()}{" "}
        </p> */}
      </div>

      <IoMdRemoveCircle onClick={deleteFun} className={style.deleteIcon} />
    </li>
  );
}

function AlertsNotification({ className }: AlertsNotificationProps) {
  const [s, setS] = useState(false);
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
  }, [fetchAlerts, dispatch, refetch]);

  return (
    <DropDown
      dataLI={data?.data || []}
      Li={({ ...data }) => <DropDownLiAlert setS={setS} {...data} />}
      messageNotFound="No Alerts Are Found!"
      disableClickOutSide={s}
      setS={setS}
    >
      <IoMdNotifications className={className} />
    </DropDown>
  );
}

export default AlertsNotification;
