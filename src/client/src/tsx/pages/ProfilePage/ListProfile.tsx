import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Link } from "react-router-dom";
import { LiComponentProps } from "../../components/baseComponents/baseComponentsTypes";
import List from "../../components/baseComponents/List/List";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { ResponseQueryAPI } from "../../redux/api/interfaceAPI";

// import programsListStyle from "./ProgramsList.module.scss";
import style from "./ListProfile.module.scss";

function ListProfile<T extends Record<string, any>>({
  useQuery,
  LI,
  queryOptions,
  heading,
  pagePath,
}: {
  pagePath?: string;
  heading: string;
  LI: LiComponentProps<T>;
  useQuery: UseQuery<any>;
  queryOptions?: Record<string, any>;
}) {
  const { data, isError, isFetching, isLoading } = useQuery({
    ...queryOptions,
  });

  return (
    <>
      <h2>{heading}</h2>

      <LoadingSpinner
        stateData={{
          data: data as ResponseQueryAPI<T> | undefined,
          isError,
          isFetching,
          isLoading,
        }}
      >
        {(data) => (
          <List
            className={style.list}
            dataArr={data.data.slice(0, 5)}
            LI={LI}
          />
        )}
      </LoadingSpinner>
      {pagePath && (
        <div className={style.list_page_link}>
          <Link to={pagePath}>{heading} Page</Link>
        </div>
      )}
    </>
  );
}

export default ListProfile;
