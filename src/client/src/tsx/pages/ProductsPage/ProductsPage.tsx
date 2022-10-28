import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";

import { productsApi } from "../../redux/api/hooksAPI";
import { ProductAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "../Page.module.scss";

import ProductsTable from "./ProductsTable";

function ProductsPage() {
  const [product, setProduct] = useState<string[]>(["", ""]);

  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.PRODUCTS_ROUTE}>
      <section className={style.page_container}>
        <div className={style.page_header}>
          <AutocompleteInput<ProductAPI>
            keys={["product_name"]}
            id={"product_id"}
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
            <Link to={`${APP_ROUTE.PRODUCTS_ADD}`}>Add Product</Link>
          </span>
        </div>
        <div className={style.page_main_content}>
          <ProductsTable mainName={product[1]} />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default ProductsPage;
