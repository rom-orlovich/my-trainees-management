import { yupResolver } from "@hookform/resolvers/yup";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import {
  incomesSchema,
  measuresSchema,
} from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { IncomeAPI, ProductAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { productsApi } from "../../../redux/api/hooksAPI";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

export function IncomeForms({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<IncomeAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <Form<IncomeAPI>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="income"
      pathMove={``}
      formOptions={{
        defaultValues: {
          user_id: authState.user_id,
          date: formatDate(new Date(), 0) as any,
          ...defaultValues,
        },
        resolver: yupResolver(incomesSchema),
      }}
    >
      {({ register, formState, control }) => {
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

            <AutocompleteInputRHF<IncomeAPI, ProductAPI>
              name="product_id"
              control={control}
              AutocompleteInputProps={{
                queriesOptions,
                defaultValueID: defaultValues?.product_id,
                InputLabelProps: {
                  LabelProps: { labelText: "Products" },
                  InputProps: { placeholder: "Search Products" },
                },
                addOption: {
                  link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.PRODUCTS_ROUTE}/${APP_ROUTE.PRODUCTS_ADD}`,
                },
                loadingSpinnerResult: { nameData: "Products" },
                useGetData: productsApi.useGetItemsQuery,
                id: "product_id",
                keys: ["product_name"],
              }}
            />
            <InputLabel
              InputProps={{ ...register("amount"), type: "number", step: 1 }}
              LabelProps={{
                htmlFor: "amount",
                labelText: "Amount",
              }}
            >
              <InputErrorMessage nameInput="Amount" error={errors.amount} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("note_topic") }}
              LabelProps={{
                htmlFor: "note_topic",
                labelText: "Topic",
              }}
            >
              <InputErrorMessage nameInput="Topic" error={errors.note_topic} />
            </InputLabel>
            <InputLabel
              TextAreaProps={{ ...register("note_text") }}
              LabelProps={{
                htmlFor: "note_text",
                labelText: "Text",
              }}
            >
              <InputErrorMessage nameInput="Text" error={errors.note_text} />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}

export default IncomeForms;
