import { useFieldArray } from "react-hook-form";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import Form from "../../../baseComponents/RHF-Components/Form/Form";

import style from "./FoodsFilterForms.module.scss";

export interface FiltersFoodProps {}

export function FoodsFilterForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FiltersFoodProps>) {
  const authState = useGetUserLoginData();

  return (
    <Form<FiltersFoodProps>
      heading={"Filters Food"}
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.filters_food_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          allergens: [],
        },
      }}
    >
      {({ control, register, formState }) => {
        const { fields, append } = useFieldArray<{}>({
          control,
          name: "",
        } as any);

        return (
          <>
            <div className="nutrient_type"></div>
            <div className="food_rules"></div>
            <div className="allergens"></div>
            <div className="nutrient_amount"></div>
          </>
        );
      }}
    </Form>
  );
}

// const checkboxGroupData: CheckBoxGroupProps = {
//     checkboxDataArr: [
//       {
//         register: register("kosher"),
//         LabelProps: { labelText: "Kosher?" },
//       },
//       {
//         register: register("isKeepMeatMilk"),
//         LabelProps: { labelText: "KeepMeat&Milk?" },
//       },
//       {
//         register: register("is_vegan"),
//         LabelProps: { labelText: "Vegan?" },
//       },
//       {
//         register: register("is_vegetarian"),
//         LabelProps: { labelText: "Vegetarian?" },
//       },
//     ],
//   };
// <CheckBoxGroup
//         heading="Rules"
//         className={style.checkbox_group}
//         checkboxDataArr={checkboxGroupData.checkboxDataArr}
//       />
