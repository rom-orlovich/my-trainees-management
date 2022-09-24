import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alertsApi } from "../../../redux/api/hooksAPI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changeModelState,
  disableFetchAlerts,
} from "../../../redux/slices/apiSideEffectSlice";
import { genClassName } from "../../../utilities/helpersFun";
import Card from "../Card/Card";
import Model from "./Model";
import style from "./ModelDialog.module.scss";
function ModelDialog() {
  const apiSideEffectState = useAppSelector((state) => state.apiSideEffect);

  const dispatch = useAppDispatch();
  const { data, refetch } = alertsApi.useGetItemsQuery({
    page: 1,
    numResults: 1,
    asc: false,
  });
  useEffect(() => {
    if (apiSideEffectState.fetchAlerts) {
      refetch();
      dispatch(disableFetchAlerts());
    }
  }, [apiSideEffectState.fetchAlerts, dispatch, refetch]);

  return apiSideEffectState.isModelOpen && data && data?.data?.length > 0 ? (
    <Model>
      <div
        id={style.backdrop}
        onClick={() => {
          dispatch(changeModelState());
        }}
      />
      <Card className={genClassName(style.model_card)}>
        <h1> {data?.data[0]?.alert_message}</h1>
        <div className={genClassName(style.button_container)}>
          <button
            onClick={() => {
              dispatch(changeModelState());
            }}
          >
            Submit
          </button>
        </div>
      </Card>
    </Model>
  ) : (
    <></>
  );
}

export default ModelDialog;
