/* eslint-disable camelcase */
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import { RiRestartFill } from "react-icons/ri";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { foodsApi } from "../../../../redux/api/hooksAPI";
import { FoodAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getModelControllerState,
  openModel,
} from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";

import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import AutocompleteInput from "../../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import Form from "../../../baseComponents/RHF-Components/Form/Form";

import style from "./FoodsListForm.module.scss";
import FoodsList from "./FoodsList/FoodsList";
import { getFilterFoodsFormState } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import ModelFormContainer from "../../../baseComponents/Model/ModelFormContainer";
import { FoodListAddForm } from "./FoodsListAddForm";

import {
  getNutritionQuestionnaireFormState,
  resetBlackListFoods,
  resetFavoriteFoods,
} from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { genClassName } from "../../../../utilities/helpersFun";
import { FilterFoodFormTypes } from "../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";

export interface FoodProps {
  id?: string;
  food_id: number;
  food_name: string;
}

export interface FoodsListFormProps {
  foods: FoodProps[];
}

export function FoodsListForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FoodsListFormProps>) {
  const dispatch = useAppDispatch();

  const { user_id } = useGetUserLoginData();
  const [chosenFood, setChooseFood] = useState(["", ""]);
  const [foodRemoveState, setFoodRemoveState] = useState<boolean>(false);

  const fitterFormState = useAppSelector(getFilterFoodsFormState);
  const nutritionQuestionnaireState = useAppSelector(
    getNutritionQuestionnaireFormState
  );
  const { curParam } = useAppSelector(getModelControllerState);
  const checkFiltersFormType = curParam === "blackListFoodsFilterForm";
  const mainName = checkFiltersFormType
    ? "Blacklist food"
    : "Favorite list food";

  const foodsListDisplay = checkFiltersFormType
    ? "black_list_foods"
    : "favorite_foods";

  const foodsListNames = checkFiltersFormType
    ? "blackListFoodsNames"
    : "favoriteFoodsNames";

  const { serverQueryProps, displayInputsForm } = nutritionQuestionnaireState;
  const curFoodsListStateParams =
    fitterFormState[curParam as FilterFoodFormTypes];
  const {
    serverQueryProps: { nutrientsValuesQueryParams, ...rest },
  } = curFoodsListStateParams;

  return (
    <Form<FoodsListFormProps>
      heading={`Choose ${mainName}`}
      onSubmit={onSubmit}
      modelMode
      customButtonText="Save"
      saveState={true}
      className={genClassName(style.food_list_form_container, curParam)}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          foods: serverQueryProps[foodsListDisplay] || [],
        },
      }}
    >
      {({ control }) => {
        const { fields, append, remove, replace } = useFieldArray({
          control,
          name: "foods",
        });

        const queryOptions = {
          mainName: chosenFood[1],
          ...nutrientsValuesQueryParams,
          ...rest,
          userID: user_id,
        };

        if (
          !fields.length &&
          !foodRemoveState &&
          displayInputsForm[foodsListNames]
        )
          replace(serverQueryProps[foodsListDisplay]);

        return (
          <>
            <span className={style.reset_button}>
              <RiRestartFill
                onClick={() => {
                  replace([]);
                  if (curParam === "blackListFoodsFilterForm")
                    dispatch(resetBlackListFoods());
                  else dispatch(resetFavoriteFoods());
                }}
              />
            </span>
            <div className="search_input">
              <AutocompleteInput<FoodAPI>
                id="food_id"
                useGetData={foodsApi.useGetItemsQuery}
                keys={["food_name"]}
                InputLabelProps={{
                  LabelProps: { labelText: "Search Food" },
                  InputProps: { placeholder: "Search Food" },
                }}
                queriesOptions={queryOptions}
                setSelectOptionValue={setChooseFood}
                getCurClickLI={(chooseFood) => {
                  if (
                    !fields.find((el) => el.food_id === Number(chooseFood[0]))
                  )
                    append({
                      food_id: Number(chooseFood[0]),
                      food_name: chooseFood[1],
                    });
                }}
                filterOptions={{
                  link: "",
                  onClick: () => {
                    dispatch(
                      openModel({
                        displayContent: "filterFoodsForm",
                        curParam,
                      })
                    );
                  },
                }}
              />
            </div>
            <div className={style.chosen_food_list}>
              <FoodsList
                remove={(index) => {
                  setFoodRemoveState(true);
                  remove(index);
                }}
                foods={fields}
              />
            </div>
          </>
        );
      }}
    </Form>
  );
}

export const FoodsListFormContent = () => (
  <ModelFormContainer AddForm={FoodListAddForm} />
);
