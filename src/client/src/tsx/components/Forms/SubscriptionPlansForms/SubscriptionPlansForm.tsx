import { yupResolver } from "@hookform/resolvers/yup";

import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { subscriptionPlansSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

function SubscriptionPlansForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<SubscriptionPlansAPI>) {
  return (
    <>
      <h2> {editMode ? "Edit" : "Add"} Member Plan </h2>
      <Form
        onSubmit={onSubmit}
        formOptions={{
          resolver: yupResolver(subscriptionPlansSchema.omit(["profile_id"])),
          defaultValues: defaultValues,
          mode: "onBlur",
        }}
      >
        {({ register, formState }) => {
          const {
            plan_name,
            current_num_trainings,
            total_trainings,
            last_training,
          } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("plan_name"),
                }}
                LabelProps={{
                  htmlFor: "plan_name",
                  labelText: "Plan Name",
                }}
              >
                <InputErrorMessage nameInput="Plan Name" error={plan_name} />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("current_num_trainings"),
                  type: "number",
                  defaultValue: 0,
                  min: 0,
                }}
                LabelProps={{
                  htmlFor: "current_num_trainings",
                  labelText: "Current Num Trainings",
                }}
              >
                <InputErrorMessage
                  nameInput="Street's address"
                  error={current_num_trainings}
                />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("total_trainings"),
                  type: "number",
                  defaultValue: 1,
                }}
                LabelProps={{
                  htmlFor: "total_trainings",
                  labelText: "Total Training",
                }}
              >
                <InputErrorMessage
                  nameInput="Total Training"
                  error={total_trainings}
                />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("last_training"),
                  type: "date",
                  defaultValue: formatDate(new Date()) as any,
                }}
                LabelProps={{
                  htmlFor: "last_training",
                  labelText: "Last Training",
                }}
              >
                <InputErrorMessage
                  nameInput="Last Training"
                  error={last_training}
                />
              </InputLabel>
              <button type="submit"> {editMode ? "Edit" : "Add"} </button>
            </>
          );
        }}
      </Form>
    </>
  );
}

export default SubscriptionPlansForm;
