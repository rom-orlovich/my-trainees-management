import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { CitiesTableAPI } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { citiesSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function CityForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<CitiesTableAPI>) {
  return (
    <Form<CitiesTableAPI>
      nameForm="City"
      editMode={editMode}
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: defaultValues,
        resolver: yupResolver(citiesSchema),
      }}
    >
      {({ register, formState }) => {
        const { city_name, district, population } = formState.errors;

        return (
          <>
            <InputLabel
              InputProps={{ ...register("city_name") }}
              LabelProps={{
                htmlFor: "city_name",
                labelText: "City",
              }}
            >
              <InputErrorMessage nameInput="City's name" error={city_name} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("district") }}
              LabelProps={{
                htmlFor: "district",
                labelText: "District",
              }}
            >
              <InputErrorMessage error={district} nameInput="District's name" />
            </InputLabel>

            <InputLabel
              InputProps={{ ...register("population") }}
              LabelProps={{
                htmlFor: "population",
                labelText: "Population",
              }}
            >
              <InputErrorMessage
                error={population}
                nameInput="Population's number"
              />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}
