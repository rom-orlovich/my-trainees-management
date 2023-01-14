import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { genClassName } from "../../../../utilities/helpersFun";
import { IconOption } from "../AutocompleteInput/AutocompleteInput";
import style from "./InputIcon.module.scss";

export interface InputIconProps {
  className?: string;
  option?: IconOption;
  IconEl: IconType;
  id?: string;
}
function InputIcon({ option, className, IconEl, id }: InputIconProps) {
  const props = {
    onClick: (
      event:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      option?.onClick && option?.onClick(id);
    },
    "data-testid": "input-icon",
    className: genClassName(style.select_plus_button, className),
  };

  const link = (
    <Link
      {...props}
      to={
        typeof option?.link === "function" ? option.link() : option?.link || ""
      }
    >
      {<IconEl />}
    </Link>
  );
  const button = <button {...props}> {<IconEl />} </button>;

  const content = option ? option?.link ? link : button : <></>;
  return content;
}

export default InputIcon;
