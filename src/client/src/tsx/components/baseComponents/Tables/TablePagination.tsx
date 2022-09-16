import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { usePaginationButtons } from "../../../hooks/usePaginationHook";
import { ResponseQueryAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { setPageState } from "../../../redux/slices/trackTablePagesSlice";
import { OmitKey } from "../../../types";
import { TableProps } from "../baseComponentsTypes";
import LoadingSpinner from "../LoadingSpinner";
import Table from "./Table";
import style from "./TablePagination.module.scss";
export function TablePagination<T extends Record<string, any>>({
  Td,
  Th,
  deleteItemFun,
  getAllQuery,
  transformFun,
  nameData,
  mainRoute,
  queriesOptions,
}: {
  nameData: string;
  getAllQuery: UseQuery<any>;
  queriesOptions?: Record<string, any>;
  transformFun?: (arg: T) => any;
  mainRoute?: string;
} & OmitKey<TableProps<T>, "dataArr">) {
  const { ButtonLeft, ButtonRight, numPage, setNumPage } =
    usePaginationButtons();
  const disptach = useAppDispatch();
  const pathName = useLocation().pathname;

  useEffect(() => {
    disptach(setPageState({ name: nameData, page: numPage }));
  }, [numPage, disptach, nameData]);

  const { data, isLoading, isError, isFetching } = getAllQuery(
    {
      page: numPage,
      ...queriesOptions,
    }
    // { refetchOnMountOrArgChange: true }
  );

  const Data = data as ResponseQueryAPI<T> | undefined;

  // Side effect that return the pre page when the current page's data is empty.
  useEffect(() => {
    if (Data && Data?.data.length === 0) {
      setNumPage((page) => (page > 1 ? page - 1 : 1));
    }
  }, [Data, numPage, setNumPage]);

  return (
    <LoadingSpinner
      nameData={nameData}
      stateData={{ data: Data, isLoading, isError, isFetching }}
    >
      {(data) => {
        const trasnformData = transformFun
          ? { next: data.next, data: data.data.map(transformFun) }
          : data;

        return trasnformData.data.length > 0 ? (
          <>
            <div className={style.tablePagination_container}>
              <Table
                mainRoute={mainRoute || pathName.slice(1)}
                Th={Th}
                Td={Td}
                dataArr={trasnformData.data}
                deleteItemFun={deleteItemFun}
              ></Table>
            </div>
            <div className={style.buttons_container}>
              <ButtonLeft className={style.left_button} />
              {trasnformData.next && (
                <ButtonRight className={style.right_button} />
              )}
            </div>
          </>
        ) : (
          <h1>{nameData || "Data"} are not found</h1>
        );
      }}
    </LoadingSpinner>
  );
}
