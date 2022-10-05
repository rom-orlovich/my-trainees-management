import React, { useEffect, useRef, useState } from "react";

import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";

import { alertsApi } from "../../../../redux/api/hooksAPI";
import { AlertsAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  changeAlertsState,
  disableFetchAlerts,
  getApiSideEffect,
} from "../../../../redux/slices/apiSideEffectSlice";
import { getAuthState } from "../../../../redux/slices/authSlice";
import { delayFun, genClassName } from "../../../../utilities/helpersFun";
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
  // Delete the alert and keep the window open
  const deleteFun = () => {
    props.setAlertNotificationState && props.setAlertNotificationState(true);
    trigger && trigger(String(props.data.alert_id));
  };

  return (
    <li
      ref={dropDownRef}
      className={`${style.notification_li}  ${props.className}`}
    >
      <div>
        <p className={style.alert_message}>{props.data.alert_message}</p>
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
  const apiSideEffect = useAppSelector(getApiSideEffect);
  const authState = useAppSelector(getAuthState);
  const queriesOptions = { userID: authState.user?.user_id };
  const [scaleUpState, setScaleUpState] = useState(false);

  const dispatch = useAppDispatch();
  const [alertNotificationState, setAlertNotificationState] = useState(false);

  useEffect(() => {
    if (apiSideEffect.isAlertsOpen) {
      setAlertNotificationState(apiSideEffect.isAlertsOpen);
      delayFun(() => {
        dispatch(changeAlertsState());
      }, 1000);
    }
  }, [apiSideEffect.isAlertsOpen, dispatch]);
  const { data, refetch } = alertsApi.useGetItemsQuery({
    page: 1,
    numResults: 5,
    asc: false,
    ...queriesOptions,
  });

  useEffect(() => {
    if (apiSideEffect.fetchAlerts) {
      dispatch(changeAlertsState());
      setScaleUpState(true);
      refetch();
      delayFun(() => {
        setScaleUpState(false);
      }, 1000).then(() => {
        dispatch(disableFetchAlerts());
      });
    }
  }, [apiSideEffect.fetchAlerts, dispatch, refetch]);

  return (
    <DropDown
      dataLI={data?.data || []}
      className={style.ul_notifications}
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
      <span className={style.alert_icon}>
        <IoMdNotifications className={className} />
        <span
          className={genClassName(
            style.alerts_number,
            data
              ? data.countRows
                ? style.alerts_number_active
                : style.alerts_number_unActive
              : "",
            scaleUpState ? style.animation_scale_up : ""
          )}
        >
          {data?.countRows}
        </span>
      </span>
    </DropDown>
  );
}

export default AlertsNotification;
