import { useState } from "react";
import { Link } from "react-router-dom";

import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { nutritionMenusListApi } from "../../redux/api/hooksAPI";
import { NutritionMenuTableApi } from "../../redux/api/interfaceAPI";
import NutritionMenusTable from "./NutritionMenusListTable";

import style from "../Page.module.scss";
import { APP_ROUTE } from "../../routes/appRoutesConstants";

import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

export const NUTRITION_MENU_NAME_DATA = "Nutrition Menu";
function NutritionMenusList() {
  const { userID, profileID } = useGetUserTraineeData();
  const [nutritionMenu, setNutritionMenu] = useState<string[]>(["", ""]);

  const queriesOptions = {
    nutritionMenu,

    userID,
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
              labelText: "Search Menu",
              htmlFor: "searchNutritionMenu",
            },
          }}
        />

        <span>
          {profileID && (
            <Link
              to={`${APP_ROUTE.NUTRITION_MENUS_LIST_ADD}?profileID=${profileID}`}
            >
              Add Menu
            </Link>
          )}
        </span>
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

export default function NutritionMenusListPage() {
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={[APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE]}
    >
      <NutritionMenusList />
    </InsteadOutletRoutes>
  );
}
