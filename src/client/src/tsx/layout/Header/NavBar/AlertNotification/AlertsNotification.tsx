import React, { useEffect, useRef, useState } from "react";

import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";

import { alertsApi } from "../../../../redux/api/hooksAPI";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { disableFetchAlerts } from "../../../../redux/slices/apiSideEffectSlice";
import { genClassName } from "../../../../utilities/helpersFun";
import DropDown from "../DropDown/DropDown";
import style from "./AlertsNotification.module.scss";
interface AlertsNotificationProps extends PropsBasic {}

function DropDownLiAlert(
  props: {
    data: AlertsAPI;
    setAlertNotificationState?: React.Dispatch<React.SetStateAction<boolean>>;
  } & PropsBasic
) {
  const dropDownRef = useRef<HTMLLIElement | null>(null);

  const [trigger] = alertsApi.useDeleteItemMutation();
  const deleteFun = () => {
    props.setAlertNotificationState && props.setAlertNotificationState(true);
    trigger && trigger(String(props.data.alert_id));
  };

  return (
    <li
      ref={dropDownRef}
      className={`${style.notification_li} ${props.className}`}
    >
      <div>
        <p className={style.alert_message}>
          {props.data.alert_message.split(".")[0]}
        </p>
        <p className={style.date}>
          {new Date(props.data.alert_date).toLocaleString()}{" "}
        </p>
      </div>
      <span>
        <IoMdRemoveCircle onClick={deleteFun} className={style.deleteIcon} />
      </span>
    </li>
  );
}

function AlertsNotification({ className }: AlertsNotificationProps) {
  const [scaleUpState, setScaleUpState] = useState(false);
  const [alertNotificationState, setAlertNotificationState] = useState(false);
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
      console.log("sclae");
      setScaleUpState(true);
      setTimeout(() => {
        setScaleUpState(false);
      }, 1000);
      refetch();
      dispatch(disableFetchAlerts());
    }
  }, [fetchAlerts, dispatch, refetch]);

  return (
    <DropDown
      dataLI={data?.data || []}
      Li={({ ...data }) => (
        <DropDownLiAlert
          setAlertNotificationState={setAlertNotificationState}
          {...data}
        />
      )}
      messageNotFound="No alerts was found!"
      alertNotificationState={alertNotificationState}
      setAlertNotificationState={setAlertNotificationState}
    >
      <span>
        <IoMdNotifications className={className} />
        <span
          className={genClassName(
            style.alerts_number,
            data?.data.length
              ? style.alerts_number_active
              : style.alerts_number_unActive,
            scaleUpState ? style.animation_scale_up : ""
          )}
        >
          {data?.data.length}
        </span>
      </span>
    </DropDown>
  );
}

export default AlertsNotification;
