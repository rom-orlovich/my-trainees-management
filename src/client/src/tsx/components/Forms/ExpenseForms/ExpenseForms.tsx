import { yupResolver } from "@hookform/resolvers/yup";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import {
  expensesSchema,
  incomesSchema,
} from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { ExpensesTableAPI, ProductAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { productsApi, traineesApi } from "../../../redux/api/hooksAPI";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

export function ExpenseForms({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ExpensesTableAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <Form<ExpensesTableAPI>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="Expense"
      pathMove={``}
      formOptions={{
        defaultValues: {
          user_id: authState.user_id,
          amount: 1,
          ...defaultValues,
          date: formatDate(defaultValues?.date || new Date(), 0) as any,
        },
        resolver: yupResolver(expensesSchema),
      }}
    >
      {({ register, formState, control, getValues, setValue }) => {
        const { errors } = formState;

        const productID = Number(getValues("product_id"));
        const amount = Number(getValues("amount"));
        const data =
          productsApi.endpoints.getItems.useQuery(queriesOptions).currentData;
        const product = data?.data.find((el) => el.product_id === productID);
        const price = Number(product?.price || 1);
        setValue("total_price", price * amount);

        return (
          <>
            <InputLabel
              InputProps={{
                ...register("date"),
                type: "date",
                defaultValue: formatDate(new Date()) as any,
              }}
              LabelProps={{
                htmlFor: "lead_date",
                labelText: "Date",
              }}
            >
              <InputErrorMessage nameInput="Date" error={errors.date} />
            </InputLabel>

            <AutocompleteInputRHF<ExpensesTableAPI, ProductAPI>
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
              InputProps={{ ...register("seller_name") }}
              LabelProps={{
                htmlFor: "seller_name",
                labelText: "Seller",
              }}
            >
              <InputErrorMessage
                nameInput="Seller"
                error={errors.seller_name}
              />
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

            <InputLabel
              InputProps={{
                ...register("total_price"),
                type: "number",
                step: 1,
                defaultValue: 0,
              }}
              LabelProps={{
                htmlFor: "total_price",
                labelText: "Total Price(NIS)",
              }}
            >
              <InputErrorMessage
                nameInput="Total Price"
                error={errors.total_price}
              />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}

export default ExpenseForms;
