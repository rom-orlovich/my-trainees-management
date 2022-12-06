import { useParams } from "react-router-dom";
import style from "../Page.module.scss";

import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import { genClassName } from "../../utilities/helpersFun";
import nutritionMenusPageStyle from "./NutritionMenuPage.module.scss";
import { nutritionMenuApi } from "../../redux/api/hooksAPI";
import MealsList from "./MealList/MealsContainer";
import { useAppDispatch } from "../../redux/hooks";
import { API_ROUTES } from "../../redux/api/apiRoutes";

function NutritionMenuPage() {
  const dispatch = useAppDispatch();
  const { userID, profileID } = useGetUserTraineeData();
  const nutritionMenuID = Number(useParams().id);

  const [trigger, data] = nutritionMenuApi.useLazyGetGenerateMenuQuery();
  const queriesOptions = {
    userID,
    id: nutritionMenuID,
    profileID,
  };

  return (
    <section
      className={genClassName(
        style.page_container,
        nutritionMenusPageStyle.nutrition_menu_page
      )}
    >
      <div className={style.page_header}>
        <span>
          {
            <button
              onClick={() => {
                trigger(queriesOptions)
                  .unwrap()
                  .then(() => {
                    dispatch(
                      nutritionMenuApi.util.invalidateTags([
                        {
                          type: API_ROUTES.NUTRITION_MENU_ENTITY,
                          id: nutritionMenuID,
                        },
                      ])
                    );
                    dispatch(
                      nutritionMenuApi.util.invalidateTags([
                        {
                          type: API_ROUTES.NUTRITION_MENU_ENTITY,
                          id: "nutrition_menu_list",
                        },
                      ])
                    );
                  })
                  .catch(console.log);
              }}
            >
              Generate Menu
            </button>
          }
        </span>
      </div>
      <div
        className={
          (style.page_main_content, nutritionMenusPageStyle.menu_container)
        }
      >
        <MealsList queriesOptions={queriesOptions} />
      </div>
    </section>
  );
}

export default NutritionMenuPage;
