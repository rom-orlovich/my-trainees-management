import { productsApi } from "../../../redux/api/hooksAPI";
import { ProductAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import ProductForm from "./ProductForm";

export function ProductAddForm() {
  const [addItem] = productsApi.useCreateOneItemMutation();

  const handleSubmit = (body: ProductAPI) => {
    addFunction({
      addItem,
    })({ ...body });
  };

  return <ProductForm onSubmit={handleSubmit} />;
}
