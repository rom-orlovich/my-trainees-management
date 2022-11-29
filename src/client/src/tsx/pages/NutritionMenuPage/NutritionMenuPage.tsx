import { useState } from "react";

import { useParams } from "react-router-dom";
import style from "../Page.module.scss";

import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import { genClassName } from "../../utilities/helpersFun";
import nutritionMenusPageStyle from "./NutritionMenuPage.module.scss";
import { nutritionMenuApi } from "../../redux/api/hooksAPI";
import MealsList from "./MealsList";

function NutritionMenuPage() {
  const { traineeID, profileID, userID } = useGetUserTraineeData();
  const nutritionMenuID = Number(useParams().id);
  // const { trainerUserID } = useGetUserTraineeData();
  const [trigger, data] = nutritionMenuApi.useLazyGetGenerateMenuQuery();
  const queriesOptions = {
    userID,
    id: nutritionMenuID,
  };

  console.log(data);
  return (
    <section
      className={genClassName(
        style.page_container,
        nutritionMenusPageStyle.nutrition_menu_page
      )}
    >
      <div className={style.page_header}>
        {/* <AutocompleteInput<NutritionMenuTableApi>
          keys={["note_topic"]}
          id={"nutrition_menu_id"}
          loadingSpinnerResult={{ nameData: NUTRITION_MENU_NAME_DATA }}
          setSelectOptionValue={setNutritionMenu}
          queriesOptions={queriesOptions}
          useGetData={nutritionMenusListApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: NUTRITION_MENU_NAME_DATA },
            LabelProps: {
              labelText: "Search Nutrition Menu",
              htmlFor: "searchNutritionMenu",
            },
          }}
        /> */}

        <span>
          {
            <button
              onClick={() => {
                trigger(queriesOptions)
                  .unwrap()
                  .then(console.log)
                  .catch(console.log);
              }}
            >
              Generate Menu
            </button>
          }
        </span>
      </div>
      <div className={style.page_main_content}>
        <MealsList data={data} />
        {/* <NutritionMenusTable queriesOptions={queriesOptions} /> */}
      </div>
    </section>
  );
}

export default NutritionMenuPage;
