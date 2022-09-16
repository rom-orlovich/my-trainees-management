import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import { EquipmentsTable } from "../../../redux/api/interfaceAPI";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { equipmentSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function EquipmentForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<EquipmentsTable>) {
  return (
    <>
      <Form<EquipmentsTable>
        onSubmit={onSubmit}
        nameForm="Equipment"
        editMode={editMode}
        formOptions={{
          mode: "onChange",
          defaultValues: defaultValues,
          resolver: yupResolver(equipmentSchema),
        }}
      >
        {({ register, formState }) => {
          const { equipment_name, brand, manufacture_year } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{ ...register("equipment_name") }}
                LabelProps={{
                  htmlFor: "equipment_name",
                  labelText: "Equipment",
                }}
              >
                <InputErrorMessage
                  nameInput="Equipment"
                  error={equipment_name}
                />
              </InputLabel>
              <InputLabel
                InputProps={{ ...register("brand") }}
                LabelProps={{
                  htmlFor: "brand",
                  labelText: "Brand",
                }}
              >
                <InputErrorMessage nameInput="Brand" error={brand} />
              </InputLabel>
              <InputLabel
                InputProps={{ ...register("manufacture_year") }}
                LabelProps={{
                  htmlFor: "manufacture_year",
                  labelText: "Manufacture Year",
                }}
              >
                <InputErrorMessage
                  nameInput="Manufacture Year"
                  error={manufacture_year}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
