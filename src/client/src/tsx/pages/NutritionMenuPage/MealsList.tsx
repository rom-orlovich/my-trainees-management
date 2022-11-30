import React from "react";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { nutritionMenuApi } from "../../redux/api/hooksAPI";
import MealDetails from "./MealDetails/MealDetails";

function MealsList({
  // data,
  queriesOptions,
}: {
  // data: any;
  queriesOptions: Record<string, any>;
}) {
  // console.log(data);
  const { data, isError, isFetching, isLoading } =
    nutritionMenuApi.useGetItemByIDQuery(queriesOptions as { id: number });
  console.log(data?.meals);
  return (
    <LoadingSpinner stateData={{ data, isError, isFetching, isLoading }}>
      {(data) => <MealDetails meals={data.meals} />}
    </LoadingSpinner>
  );
}

export default MealsList;
