/* eslint-disable camelcase */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { nutritionMenusListApi } from "../../../redux/api/hooksAPI";
import {
  NutritionMenuTableApi,
  ResponseMutationAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";

import {} from "../../../redux/slices/formValuesStateSlice";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { NutritionMenusListForm } from "./NutritionMenusListForm";

export function NutritionMenusListAddForm() {
  const navigate = useNavigate();
  const [addItem] = nutritionMenusListApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  // resetGoPrevPagesState disable the behavior of returning to pre page , after submit form.
  // Instead after submit this form the function will move the user to his training program's exercises list.
  useEffect(() => {
    dispatch(disableGoPrevPage());
  }, []);

  const handleSubmit = ({
    nutrition_menu_id,

    ...body
  }: NutritionMenuTableApi) =>
    addFunction({
      addItem,
    })(body).then((response) => {
      const Response = response as unknown as { data: ResponseMutationAPI };

      navigate(
        `/${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}/${Number(Response.data.id)}/${
          APP_ROUTE.NUTRITION_MENU_ROUTE
        }?profileID=${body.profile_id}`
      );

      return Response;
    });
  return <NutritionMenusListForm onSubmit={handleSubmit} />;
}
