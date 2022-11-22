import React from "react";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { productsApi } from "../../../redux/api/hooksAPI";
import { ProductAPI } from "../../../redux/api/interfaceAPI";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ProductForm } from "./ProductForm";

function ProductEditForm({ id }: { id: number }) {
  const [updateItem] = productsApi.useUpdateItemMutation();
  const { data, isFetching, isError, isLoading } =
    productsApi.useGetItemByIDQuery({
      id,
      userID: useGetUserLoginData().user_id,
    });

  const handleSubmit = (body: ProductAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Product"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => (
        <ProductForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={data}
        />
      )}
    </LoadingSpinner>
  );
}

export default ProductEditForm;
