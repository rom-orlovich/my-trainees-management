import { useState } from "react";
import { Link } from "react-router-dom";

import style from "../Page.module.scss";

import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import { genClassName } from "../../utilities/helpersFun";
import nutritionMenusPageStyle from "./NutritionMenuPage.module.scss";

function NutritionMenuPage() {
  const { traineeID, profileID } = useGetUserTraineeData();
  const [nutritionMenu, setNutritionMenu] = useState<string[]>(["", ""]);
  const authState = useAppSelector(getAuthState);

  const queriesOptions = {
    nutritionMenu,
    traineeID,
    trainerUserID: authState.user?.user_id,
    orderBy: "date_start",
    asc: "false",
  };

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

        <span>{<button>Generate Menu</button>}</span>
      </div>
      <div className={style.page_main_content}>
        {/* <NutritionMenusTable queriesOptions={queriesOptions} /> */}
      </div>
    </section>
  );
}

export default NutritionMenuPage;
