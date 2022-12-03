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
  return (
    <span className={genClassName(style.select_plus_button, className)}>
      {option ? (
        <Link
          onClick={(e) => {
            e.preventDefault();
            option?.onClick && option?.onClick(id);
          }}
          to={
            typeof option.link === "function"
              ? option.link()
              : option.link || ""
          }
        >
          {<IconEl />}
        </Link>
      ) : (
        <> </>
      )}
    </span>
  );
}

export default InputIcon;
