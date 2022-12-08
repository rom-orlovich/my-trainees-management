import { genClassName } from "../../../../utilities/helpersFun";

import Checkbox, { CheckBox } from "./Checkbox";

import style from "../GroupInputs.module.scss";

export interface CheckBoxGroupProps {
  checkboxDataArr: CheckBox[];
  className?: string;
  heading?: string;
}

function CheckBoxGroup({
  checkboxDataArr,
  heading,
  className,
}: CheckBoxGroupProps) {
  return (
    <span className={genClassName(style.group_inputs_container, className)}>
      {heading && <label>{heading} </label>}

      <div className={genClassName(style.group_inputs_layout)}>
        {checkboxDataArr.map((el, i) => (
          <Checkbox
            key={el.LabelProps.labelText + i}
            {...el}
            register={el.register}
          />
        ))}
      </div>
    </span>
  );
}

export default CheckBoxGroup;
