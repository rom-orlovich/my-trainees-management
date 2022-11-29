import React from "react";
import { nutritionMenuApi } from "../../redux/api/hooksAPI";

function MealsList({
  // data,
  queriesOptions,
}: {
  // data: any;
  queriesOptions: Record<string, any>;
}) {
  // console.log(data);
  const { data } = nutritionMenuApi.useGetItemByIDQuery(
    queriesOptions as { id: number }
  );
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}

export default MealsList;
