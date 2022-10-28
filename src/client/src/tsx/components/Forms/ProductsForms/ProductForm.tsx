/* eslint-disable camelcase */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { productSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { ProductAPI } from "../../../redux/api/interfaceAPI";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

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
      formOptions={{
        defaultValues: {
          price: 1,
          user_id: useGetUserLoginData().user_id,
          product_type: defaultValues?.product_type,
          ...defaultValues,
        },
        resolver: yupResolver(productSchema),
      }}
    >
      {({ register, formState, setValue, watch }) => {
        const product_type = watch("product_type");

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
                { value: "Other", label: "Other" },
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
