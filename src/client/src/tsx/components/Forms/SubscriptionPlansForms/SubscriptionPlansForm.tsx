/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../baseComponents/Model/ModelFormContainer";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { subscriptionPlansSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import SubscriptionPlansAddForm from "./SubscriptionPlansAddForm";
import SubscriptionPlansEditForm from "./SubscriptionPlansEditForm";

function SubscriptionPlansForm({
  onSubmit,
  defaultValues,
  editMode,
  fromProps,
}: GeneralFormProps<SubscriptionPlansAPI>) {
  const params = useParams();
  const traineeID = Number(params["*"]?.split("/")[0]);
  console.log(traineeID);
  return (
    <>
      <Form
        onSubmit={onSubmit}
        nameForm="Subscription Plans"
        editMode={editMode}
        formProps={{ className: ` ${fromProps?.className}` }}
        formOptions={{
          resolver: yupResolver(subscriptionPlansSchema.omit(["trainee_id"])),
          defaultValues: { ...defaultValues, trainee_id: traineeID },
          mode: "onBlur",
        }}
      >
        {({ register, formState }) => {
          const { current_num_trainings, total_trainings, last_training } =
            formState.errors;

          return (
            <>
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

export function ModelSubscriptionPlansFormContent() {
  return (
    <ModelFormContainer
      EditForm={SubscriptionPlansEditForm}
      AddForm={SubscriptionPlansAddForm}
    />
  );
}

export default SubscriptionPlansForm;
