import { useState } from "react";
import { Link } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { nutritionMenusListApi } from "../../redux/api/hooksAPI";
import { NutritionMenuTableApi } from "../../redux/api/interfaceAPI";
import NutritionMenusTable from "./MyNutritionMenusTable";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";

export const NUTRITION_MENU_NAME_DATA = "Nutrition Menu";
function MyNutritionMenusPage() {
  const { traineeID, userID, trainerUserID, profileID } =
    useGetUserTraineeData();
  const [nutritionMenu, setNutritionMenu] = useState<string[]>(["", ""]);

  const queriesOptions = {
    nutritionMenu,
    traineeID,
    userID,
    profileID,
  };

  return (
    <section className={style.page_container}>
      <div className={style.page_header}>
        <AutocompleteInput<NutritionMenuTableApi>
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
        />
      </div>
      <div className={style.page_main_content}>
        <NutritionMenusTable
          mainName={nutritionMenu[1]}
          queriesOptions={queriesOptions}
        />
      </div>
    </section>
  );
}

export default MyNutritionMenusPage;
