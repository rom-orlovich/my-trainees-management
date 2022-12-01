import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import List from "../../List/List";

import Checkbox, { CheckBox } from "./Checkbox";
import style from "./CheckboxGroup.module.scss";

export interface CheckBoxGroupProps {
  checkboxDataArr: CheckBox[];
  groupName: string;
}

function CheckBoxGroup({ checkboxDataArr, groupName }: CheckBoxGroupProps) {
  return (
    <List
      className={genClassName(style.checkbox_group_container)}
      LI={(props) => {
        const inputProps = props.InputProps
          ? { ...props.InputProps, name: groupName }
          : { name: groupName };
        return <Checkbox {...props} InputProps={inputProps} />;
      }}
      dataArr={checkboxDataArr}
    />
  );
}

export default CheckBoxGroup;
