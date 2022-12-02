import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { foodsApi } from "../../../redux/api/hooksAPI";
import { FoodAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { openModel } from "../../../redux/slices/modelControllerSlice";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import AutocompleteInput from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import Form from "../../baseComponents/RHF-Components/Form/Form";

import style from "./FoodListForm.module.scss";
import FoodsList from "./FoodsList";

export interface FoodFilterProps {
  food_id: number;
  food_name: string;
}

export interface FoodFilterFormProps {
  foods: FoodFilterProps[];
}

export function FoodListForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FoodFilterFormProps>) {
  const dispatch = useAppDispatch();

  const { user_id } = useGetUserLoginData();
  const [chooseFood, setChooseFood] = useState(["", ""]);
  return (
    <Form<FoodFilterFormProps>
      heading="Choose Food"
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.food_list_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          foods: [],
        },
      }}
    >
      {({ control, register, formState }) => {
        const { fields, append, update } = useFieldArray({
          control,
          name: "foods",
        });
        if (chooseFood[0])
          append({ food_id: Number(chooseFood[0]), food_name: chooseFood[1] });

        // if (!fields.length) append({});

        return (
          <>
            <div className="search_input">
              <AutocompleteInput<FoodAPI>
                id="food_id"
                useGetData={foodsApi.useGetItemsQuery}
                keys={["food_name"]}
                InputLabelProps={{ LabelProps: { labelText: "Search Food" } }}
                queriesOptions={{ userID: user_id }}
                setSelectOptionValue={setChooseFood}
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
            <div className="chosen_food_list">
              <FoodsList foods={fields} />
            </div>
          </>
        );
      }}
    </Form>
  );
}
