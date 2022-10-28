/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { productsApi } from "../../redux/api/hooksAPI";
import { ProductAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataCity = (arg: ProductAPI) => {
  const { product_name, product_type, price, product_id } = arg;

  return { product_id, product: product_name, type: product_type, price };
};
function ProductsTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = productsApi;

  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.PRODUCTS_ROUTE}>
      <TablePagination<ProductAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Products List"}
        getAllQuery={useGetItemsQuery}
        transformFun={transformDataCity}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default ProductsTable;
