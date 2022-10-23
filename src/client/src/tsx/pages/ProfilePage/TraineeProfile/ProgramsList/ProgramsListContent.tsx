import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Link, useParams } from "react-router-dom";
import { LiComponentProps } from "../../../../components/baseComponents/baseComponentsTypes";
import List from "../../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { ResponseQueryAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
// import style from "./Programs.module.scss";
import listProfileStyle from "../../ListProfile.module.scss";

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
  const { id } = useParams();
  return (
    <>
      <h2>
        <Link to={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}?traineeID=${id}`}>
          {heading}
        </Link>
      </h2>
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
            className={listProfileStyle.list}
            dataArr={data.data.slice(0, 5)}
            LI={LI}
          />
        )}
      </LoadingSpinner>
    </>
  );
}

export default ProgramsProfileContent;
