import React from "react";
import { getKeysArrObj } from "../../utlities/helpersFun";

import { ListProps } from "./baseComponentsTypes";

// Render list data of obj by given Li component.
function List<T extends Record<string, any>>({
  dataArr,
  LI,
  className,
  children,
  insertChildLast,
  ulProps,
}: ListProps<T> & { insertChildLast?: boolean }) {
  if (!dataArr[0]) return <> </>;

  const keys = getKeysArrObj(dataArr[0]);
  let key = keys[0] + keys[1];

  return (
    <ul {...ulProps} className={className}>
      {!insertChildLast ? children : ""}
      {dataArr.map((el, i) => {
        return <LI key={`${key}${i}`} {...el} />;
      })}
      {insertChildLast ? children : ""}
    </ul>
  );
}

export default List;
