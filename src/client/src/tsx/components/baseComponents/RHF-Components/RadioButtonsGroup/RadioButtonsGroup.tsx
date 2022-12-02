import { genClassName } from "../../../../utilities/helpersFun";
import RadioButton, { RadioButtonProps } from "./RadioButton";
import style from "../GroupInputs.module.scss";

export interface RadioButtonGroupProps {
  radioButtonsDataArr: RadioButtonProps[];
  className?: string;
  heading?: string;
}

function RadioButtonsGroup({
  radioButtonsDataArr,
  className,
  heading,
}: RadioButtonGroupProps) {
  return (
    <span className={genClassName(style.group_inputs_container, className)}>
      {heading && <label>{heading} </label>}
      <div className={genClassName(style.group_inputs_layout)}>
        {radioButtonsDataArr.map((el, i) => (
          <RadioButton
            key={el.LabelProps.labelText + i}
            {...el}
            register={el.register}
          />
        ))}
      </div>
    </span>
  );
}

export default RadioButtonsGroup;
