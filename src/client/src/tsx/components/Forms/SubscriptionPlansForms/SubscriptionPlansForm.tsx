/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

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
  fromProps,
}: GeneralFormProps<SubscriptionPlansAPI>) {
  return (
    <>
      <Form
        onSubmit={onSubmit}
        nameForm="Subscription Plans"
        editMode={editMode}
        formProps={{ className: ` ${fromProps?.className}` }}
        formOptions={{
          resolver: yupResolver(subscriptionPlansSchema.omit(["trainee_id"])),
          defaultValues: { ...defaultValues },
          mode: "onBlur",
        }}
      >
        {({ register, formState }) => {
          const {
            product_id,
            current_num_trainings,
            total_trainings,
            last_training,
          } = formState.errors;

          return (
            <>
              {/* <InputLabel
                InputProps={{
                  ...register("product_id"),
                }}
                LabelProps={{
                  htmlFor: "plan_name",
                  labelText: "Plan Name",
                }}
              >
                <InputErrorMessage nameInput="Plan Name" error={product_id} />
              </InputLabel> */}
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
            </>
          );
        }}
      </Form>
    </>
  );
}

export default SubscriptionPlansForm;
