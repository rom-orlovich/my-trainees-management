/* eslint-disable camelcase */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  // FormWithNotesProps,
  GeneralFormProps,
} from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import {
  leadsSchema,
  productSchema,
} from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { LeadsTableAPI, ProductAPI } from "../../../redux/api/interfaceAPI";

import Checkbox from "../../baseComponents/RHF-Components/Checkbox";
import { formatDate } from "../../../utilities/helpersFun";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { productsApi } from "../../../redux/api/hooksAPI";
import { SelectInput } from "../../baseComponents/RHF-Components/SelectInput/SelectInput";

export function ProductForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ProductAPI>) {
  return (
    <Form<ProductAPI>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="Product"
      // pathMove={`/${APP_ROUTE.LEADS_ROUTE}`}
      formOptions={{
        defaultValues: {
          price: 1,
          user_id: useGetUserLoginData().user_id,
          ...defaultValues,
        },
        resolver: yupResolver(productSchema),
      }}
    >
      {({ register, formState, getValues, setValue, watch }) => {
        const product_type = watch("product_type");
        console.log(product_type);
        // const product_type = getValues("product_type");
        // console.log(product_type);

        if (product_type === "Subscription Plans") {
          setValue("max_training", 1);
        }

        const { errors } = formState;
        return (
          <>
            <InputLabel
              InputProps={{
                ...register("product_name"),
                type: "text",
              }}
              LabelProps={{
                htmlFor: "product_name",
                labelText: "Product",
              }}
            >
              <InputErrorMessage
                nameInput="Product"
                error={errors.product_name}
              />
            </InputLabel>

            <SelectInput
              selectProps={{ ...register("product_type") }}
              options={[
                { value: "Subscription Plans", label: "Subscription Plans" },
                { value: "Nutrition Plans", label: "Nutrition Plans" },
                { value: "other", label: "Other" },
              ]}
              LabelProps={{ labelText: "Type" }}
            />
            <InputLabel
              InputProps={{ ...register("price") }}
              LabelProps={{
                htmlFor: "price",
                labelText: "Price(NIS)",
              }}
            >
              <InputErrorMessage nameInput="Price" error={errors.price} />
            </InputLabel>
            {product_type === "Subscription Plans" && (
              <InputLabel
                InputProps={{
                  type: "number",
                  ...register("max_training"),
                }}
                LabelProps={{
                  htmlFor: "max_training",
                  labelText: "Max Training",
                }}
              >
                <InputErrorMessage
                  nameInput="Max Training"
                  error={errors.max_training}
                />
              </InputLabel>
            )}
          </>
        );
      }}
    </Form>
  );
}

export default ProductForm;
