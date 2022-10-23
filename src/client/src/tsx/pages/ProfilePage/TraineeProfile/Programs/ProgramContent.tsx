import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { LiComponentProps } from "../../../../components/baseComponents/baseComponentsTypes";
import List from "../../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { ResponseQueryAPI } from "../../../../redux/api/interfaceAPI";
import style from "./Programs.module.scss";

function ProgramsProfileContent<T extends Record<string, any>>({
  useQuery,
  LI,
  queryOptions,
  heading,
}: {
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
      <h2>{heading} </h2>
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
            className={style.programs_list}
            dataArr={data.data.slice(0, 5)}
            LI={LI}
          />
        )}
      </LoadingSpinner>
    </>
  );
}

export default ProgramsProfileContent;
