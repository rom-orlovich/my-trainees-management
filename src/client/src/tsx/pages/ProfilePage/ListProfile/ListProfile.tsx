import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LiComponentProps } from "../../../components/baseComponents/baseComponentsTypes";
import List from "../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { ResponseQueryAPI } from "../../../redux/api/interfaceAPI";
import { genClassName } from "../../../utilities/helpersFun";

import style from "./ListProfile.module.scss";

function ListProfile<T extends Record<string, any>>({
  useQuery,
  LI,
  queryOptions,
  heading,
  pagePath,
  dataNotFoundEl,
}: {
  pagePath?: string;
  heading: string;
  LI: LiComponentProps<T>;
  useQuery: UseQuery<any>;
  queryOptions?: Record<string, any>;
  dataNotFoundEl?: ReactNode;
}) {
  const { data, isError, isFetching, isLoading } = useQuery({
    ...queryOptions,
  });

  return (
    <>
      <LoadingSpinner
        message={dataNotFoundEl || <></>}
        stateData={{
          data: data as ResponseQueryAPI<T> | undefined,
          isError,
          isFetching,
          isLoading,
        }}
      >
        {(data) => (
          <div className={style.list_container}>
            <h2>{heading}</h2>
            <div className={style.list_content}>
              <List
                className={style.list}
                dataArr={data.data.slice(0, 3)}
                LI={LI}
              />
              {pagePath && (
                <div className={genClassName(style.list_page_link)}>
                  <Link to={pagePath}>{heading} Page</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </LoadingSpinner>
    </>
  );
}

export default ListProfile;
