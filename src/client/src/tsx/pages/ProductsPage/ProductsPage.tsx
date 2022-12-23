import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";

import { productsApi } from "../../redux/api/hooksAPI";
import { ProductAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";

import ProductsTable from "./ProductsTable";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<string[]>(["", ""]);
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.PRODUCTS_ROUTE}>
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<ProductAPI>
            keys={["product_name"]}
            id={"product_id"}
            queriesOptions={queriesOptions}
            loadingSpinnerResult={{ nameData: "Products" }}
            setSelectOptionValue={setProduct}
            useGetData={productsApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Product Name" },
              LabelProps: {
                labelText: "Product City",
                htmlFor: "productSearch",
              },
            }}
          />

          <span>
            <Link
              onClick={() => {
                dispatch(openModel({ displayContent: "productForm" }));
              }}
              to={``}
            >
              Add Product
            </Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <ProductsTable
            mainName={product[1]}
            queriesOptions={queriesOptions}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ProductsPage;
