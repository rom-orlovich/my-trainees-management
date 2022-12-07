import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { nutritionMenuApi } from "../../../redux/api/hooksAPI";

import MealsList from "./MealsList/MealsList";

function MealsContainer({
  queriesOptions,
}: {
  queriesOptions: Record<string, any>;
}) {
  const { data, isError, isFetching, isLoading, error } =
    nutritionMenuApi.useGetItemByIDQuery(queriesOptions as { id: number });
  const Error = error as { data: { message: string } };

  return (
    <LoadingSpinner
      showNoDataMessage
      className="no_menu_found"
      message={<>{Error?.data?.message}</>}
      stateData={{
        data,
        isError,
        isFetching,
        isLoading,
        error: error as Error,
      }}
    >
      {(data) => (
        <>
          <MealsList meals={data.meals} />
        </>
      )}
    </LoadingSpinner>
  );
}

export default MealsContainer;
