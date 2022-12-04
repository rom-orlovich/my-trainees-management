/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { foodsApi } from "../../../../redux/api/hooksAPI";
import { FoodAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { openModel } from "../../../../redux/slices/modelControllerSlice";

import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import AutocompleteInput from "../../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import Form from "../../../baseComponents/RHF-Components/Form/Form";

import style from "./FoodsListForm.module.scss";
import FoodsList from "./FoodsList/FoodsList";
import { getFilterFoodsFormState } from "../../../../redux/slices/nutritionQuestionnaireFormStates/filterFoodsFormSlice";
import ModelFormContainer from "../../../baseComponents/Model/ModelFormContainer";
import { FoodListAddForm } from "./FoodsListAddForm";
import useSaveFormState from "../../../../hooks/useSaveFormState";
import { getNutritionQuestionnaireFormState } from "../../../../redux/slices/nutritionQuestionnaireFormStates/nutritionQuestionnaireFormSlice";

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
  const [chooseFood, setChooseFood] = useState(["", ""]);
  const fitterFormState = useAppSelector(getFilterFoodsFormState);
  const foodsList = useAppSelector(getNutritionQuestionnaireFormState);
  const {
    favoriteFoodFilterForm: {
      serverQueryProps: { nutrientsValuesQueryParams, ...rest },
    },
  } = fitterFormState;

  return (
    <Form<FoodsListFormProps>
      heading="Choose Food"
      onSubmit={onSubmit}
      modelMode
      // saveState={true}

      saveState={false}
      formProps={{ className: style.food_list_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          foods: foodsList?.serverQueryProps?.favorite_foods || [],
        },
      }}
    >
      {({ control, getValues }) => {
        const { fields, append, remove } = useFieldArray({
          control,
          name: "foods",
        });

        const queryOptions = {
          ...nutrientsValuesQueryParams,
          ...rest,
          userID: user_id,
        };

        return (
          <>
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
                  onClick: (id: number) => {
                    dispatch(
                      openModel({
                        displayContent: "filterFoodForm",
                        curParam: id,
                      })
                    );
                  },
                }}
              />
            </div>
            <div className={style.chosen_food_list}>
              <FoodsList remove={remove} foods={fields} />
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
