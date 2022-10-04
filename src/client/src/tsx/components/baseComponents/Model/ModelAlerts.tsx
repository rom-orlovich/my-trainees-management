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
import LoadingSpinner from "../LoadingSpinner";
import Model from "./Model";
import style from "./ModelAlerts.module.scss";
function ModelAlerts() {
  const fetchAlerts = useAppSelector((state) => state.apiSideEffect);

  const dispatch = useAppDispatch();
  const { refetch, data, isFetching, isLoading, isError } =
    alertsApi.useGetItemsQuery({
      page: 1,
      numResults: 1,
      asc: false,
    });
  useEffect(() => {
    if (fetchAlerts) {
      refetch();
      dispatch(disableFetchAlerts());
    }
  }, [fetchAlerts, dispatch, refetch]);

  return (
    <Model>
      <div
        id={style.backdrop}
        onClick={() => {
          dispatch(changeModelState());
        }}
      />
      <Card className={genClassName(style.model_card)}>
        <LoadingSpinner
          nameData="Alerts"
          stateData={{ data, isFetching, isLoading, isError }}
        >
          {(data) => (
            <>
              <h1> {data.data[0]?.alert_message}</h1>
              <div className={genClassName(style.button_container)}>
                <button
                  onClick={() => {
                    dispatch(changeModelState());
                  }}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </LoadingSpinner>
      </Card>
    </Model>
  );
}

export default ModelAlerts;
