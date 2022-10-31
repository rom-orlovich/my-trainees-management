import { yupResolver } from "@hookform/resolvers/yup";

import { ActivitiesTableAPI } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import { activitySchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import style from "./ActivityForm.module.scss";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

export function ActivityForm({
  editMode,
  onSubmit,
  defaultValues,
}: GeneralFormProps<ActivitiesTableAPI>) {
  return (
    <>
      <Form<ActivitiesTableAPI>
        onSubmit={onSubmit}
        editMode={editMode}
        // pathMove={`/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}`}
        nameForm="Activity"
        formProps={{ className: style.form_activity }}
        formOptions={{
          defaultValues: {
            user_id: useGetUserLoginData().user_id,
            ...defaultValues,
          },
          resolver: yupResolver(activitySchema),
        }}
      >
        {({ register, formState, reset }) => {
          const { errors } = formState;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("activity_name"),
                  // isError: !!muscles_group_name,
                }}
                LabelProps={{
                  htmlFor: "activity_name",
                  labelText: "Activity",
                }}
              >
                <InputErrorMessage
                  nameInput="Activity Name"
                  error={errors.activity_name}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
