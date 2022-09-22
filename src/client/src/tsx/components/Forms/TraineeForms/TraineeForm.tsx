import { yupResolver } from "@hookform/resolvers/yup";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { traineesSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import {
  LocationsGetRes,
  TraineesTableAPI,
} from "../../../redux/api/interfaceAPI";
import { SelectInput } from "../../baseComponents/RHF-Components/SelectInput/SelectInput";
import { locationsApi } from "../../../redux/api/hooksAPI";

import Checkbox from "../../baseComponents/RHF-Components/Checkbox";
import { formatDate } from "../../../utilities/helpersFun";

import { APP_ROUTE } from "../../../routes/routesConstants";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import { OmitKey } from "../../../types";

export function TraineeForm({
  fromProps,
  onSubmit,
  defaultValues,
  editMode,
  heading,
  savedChangedButton,
}: GeneralFormProps<OmitKey<TraineesTableAPI, "profile_id">> & {
  heading?: string;
  savedChangedButton?: boolean;
}) {
  return (
    <Form<TraineesTableAPI>
      savedChangedButton={savedChangedButton}
      nameForm="Trainee"
      pathMove={`/${APP_ROUTE.TRAINEES_ROUTE}`}
      heading={heading}
      editMode={editMode}
      formProps={{
        className: " " + fromProps?.className,
        ...fromProps,
      }}
      onSubmit={onSubmit}
      formOptions={{
        mode: "onChange",
        defaultValues: { ...defaultValues },
        resolver: yupResolver(traineesSchema.omit(["profile_id"])),
      }}
    >
      {({ register, formState, control }) => {
        const {
          first_name,
          last_name,
          birthday,

          identify_num,
          email,
          phone_number,
          date_join,
          status,
        } = formState.errors;

        return (
          <>
            <InputLabel
              InputProps={{ ...register("first_name") }}
              LabelProps={{
                htmlFor: "first_name",
                labelText: "First Name",
              }}
            >
              <InputErrorMessage nameInput="First Name" error={first_name} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("last_name") }}
              LabelProps={{
                htmlFor: "last_name",
                labelText: "Last Name",
              }}
            >
              <InputErrorMessage nameInput="Last Name" error={last_name} />
            </InputLabel>
            <SelectInput
              selectProps={{ ...register("gender") }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              LabelProps={{ labelText: "Gender" }}
            ></SelectInput>

            <InputLabel
              InputProps={{ ...register("birthday"), type: "date" }}
              LabelProps={{
                htmlFor: "birthday",
                labelText: "Birthday",
              }}
            >
              <InputErrorMessage nameInput="Birthday" error={birthday} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("identify_num") }}
              LabelProps={{
                htmlFor: "identify_num",
                labelText: "Identify Number",
              }}
            >
              <InputErrorMessage
                nameInput="Identify Number"
                error={identify_num}
              />
            </InputLabel>

            <InputLabel
              InputProps={{ ...register("phone_number") }}
              LabelProps={{
                htmlFor: "phone_number",
                labelText: "Phone Number",
              }}
            >
              <InputErrorMessage
                nameInput="Phone Number"
                error={phone_number}
              />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("email"), type: "email" }}
              LabelProps={{
                htmlFor: "email",
                labelText: "Email",
              }}
            >
              <InputErrorMessage nameInput="Email" error={email} />
            </InputLabel>

            <AutocompleteInputRHF<TraineesTableAPI, LocationsGetRes>
              name="location_id"
              control={control}
              AutocompleteInputProps={{
                defaultValueID: defaultValues?.location_id,
                InputLabelProps: {
                  LabelProps: { labelText: "Locations" },

                  InputProps: { placeholder: "Search Location" },
                },
                addOption: {
                  link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.LOCATION_ROUTE}/${APP_ROUTE.LOCATION_ROUTE_ADD}`,
                },
                loadingSpinnerResult: { nameData: "Locations" },
                useGetData: locationsApi.useGetItemsQuery,
                id: "location_id",
                keys: ["street", "city_name"],
              }}
            />

            <InputLabel
              InputProps={{
                ...register("date_join"),
                type: "date",
                defaultValue: formatDate(new Date() as any),
              }}
              LabelProps={{
                htmlFor: "date_join",
                labelText: "Date Join",
              }}
            >
              <InputErrorMessage nameInput="Date Join" error={date_join} />
            </InputLabel>
            <Checkbox
              LabelProps={{ labelText: "Active" }}
              InputProps={{ ...register("status") }}
            >
              <InputErrorMessage nameInput="Active" error={status} />
            </Checkbox>
          </>
        );
      }}
    </Form>
  );
}

export default TraineeForm;
