import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { nutritionMenuApi } from "../../../redux/api/hooksAPI";

import style from "./MealsContainer.module.scss";
import MealsList from "./MealsList/MealsList";

function MealsContainer({
  queriesOptions,
}: {
  queriesOptions: Record<string, any>;
}) {
  // console.log(data);
  const { data, isError, isFetching, isLoading } =
    nutritionMenuApi.useGetItemByIDQuery(queriesOptions as { id: number });

  return (
    <LoadingSpinner stateData={{ data, isError, isFetching, isLoading }}>
      {(data) => {
        console.log(data);
    
        return (
          <>
            <MealsList meals={data.meals} />
          </>
        );
      }}
    </LoadingSpinner>
  );
}

export default MealsContainer;
