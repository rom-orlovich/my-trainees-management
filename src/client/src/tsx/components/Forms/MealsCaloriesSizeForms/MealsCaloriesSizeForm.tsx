import { useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";

import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

import style from "./MealsCaloriesSizeForm.module.scss";

export interface MealsCaloriesSizeFormProps {
  meals_calories_size_percents: number[];
}
export function MealsCaloriesSizeForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<MealsCaloriesSizeFormProps>) {
  const authState = useGetUserLoginData();

  return (
    <Form<MealsCaloriesSizeFormProps>
      nameForm="Meal Size"
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.meals_calories_size_percents_form }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          meals_calories_size_percents: [5],
        },
      }}
    >
      {({ control, register, formState }) => {
        const { fields, append, update } =
          useFieldArray<MealsCaloriesSizeFormProps>({
            control,
            name: "meals_calories_size_percents",
          } as any);
        if (!fields.length) append(5);

        return (
          <div className={style.inputs_container}>
            <div className={style.inputs_layout}>
              {fields.map((el, index) => (
                <InputLabel
                  key={`meals_calories_size_percents[${index}]`}
                  LabelProps={{ labelText: `Meal ${index + 1} (%)` }}
                  inputIconProps={{
                    IconEl: IoMdAddCircleOutline,
                    option: {
                      onClick: () => {
                        append(50);
                      },
                      link: "",
                    },
                  }}
                  InputProps={{
                    ...register(`meals_calories_size_percents.${index}`, {
                      required: true,
                    }),

                    type: "number",

                    min: 1,
                    max: 100,
                  }}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Form>
  );
}
