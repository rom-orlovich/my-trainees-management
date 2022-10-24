import { yupResolver } from "@hookform/resolvers/yup";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { measuresSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { MeasuresAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";

export function MeasureForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<MeasuresAPI>) {
  return (
    <Form<MeasuresAPI>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="Measure"
      pathMove={``}
      formOptions={{
        defaultValues: {
          date: new Date(),
          fat_per_kg: 0.5,
          protein_per_kg: 1.6,
          activity_factor: 28,
          ...defaultValues,
        },
        resolver: yupResolver(measuresSchema),
      }}
    >
      {({ register, formState }) => {
        const { errors } = formState;
        return (
          <>
            <InputLabel
              InputProps={{
                ...register("date"),
                type: "date",
                defaultValue: formatDate(new Date()) as any,
              }}
              LabelProps={{
                htmlFor: "date_lead",
                labelText: "Date",
              }}
            >
              <InputErrorMessage nameInput="Date" error={errors.date} />
            </InputLabel>

            <InputLabel
              InputProps={{ ...register("weight"), type: "number" }}
              LabelProps={{
                htmlFor: "weight",
                labelText: "Weight(kg)",
              }}
            >
              <InputErrorMessage nameInput="Weight" error={errors.weight} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("height"), type: "number" }}
              LabelProps={{
                htmlFor: "height",
                labelText: "Height(cm)",
              }}
            >
              <InputErrorMessage nameInput="Height" error={errors.height} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("fat_percents"), type: "number" }}
              LabelProps={{
                htmlFor: "fat_percents",
                labelText: "Fat Percents",
              }}
            >
              <InputErrorMessage
                nameInput="Fat Percents"
                error={errors.fat_percents}
              />
            </InputLabel>
            <InputLabel
              InputProps={{
                ...register("activity_factor"),
                type: "number",
                min: 28,
                max: 32,
              }}
              LabelProps={{
                htmlFor: "activity_factor",
                labelText: "Activity Factor",
              }}
            >
              <InputErrorMessage
                nameInput="Activity Factor"
                error={errors.activity_factor}
              />
            </InputLabel>

            <InputLabel
              InputProps={{ ...register("protein_per_kg"), type: "number" }}
              LabelProps={{
                htmlFor: "protein_per_kg",
                labelText: "Protein/kg",
              }}
            >
              <InputErrorMessage
                nameInput="Protein/kg"
                error={errors.protein_per_kg}
              />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("fat_per_kg"), type: "number" }}
              LabelProps={{
                htmlFor: "fat_per_kg",
                labelText: "Fat/kg",
              }}
            >
              <InputErrorMessage nameInput="Fat/kg" error={errors.fat_per_kg} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("fixed_cals"), type: "number" }}
              LabelProps={{
                htmlFor: "fixed_cals",
                labelText: "Fixed Cals",
              }}
            >
              <InputErrorMessage
                nameInput="Fixed Cals"
                error={errors.fixed_cals}
              />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}

export default MeasureForm;
