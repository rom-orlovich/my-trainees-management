import style from "../../baseComponents/Model/ModelFormContainer.module.scss";

import { AllergensAddForm } from "./AllergensAddForm";

function AllergensFormContent() {
  return (
    <div className={style.model_form_container}>{<AllergensAddForm />}</div>
  );
}

export default AllergensFormContent;
