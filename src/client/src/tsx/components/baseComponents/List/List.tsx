import React from "react";
import { getKeysArrObj } from "../../../utilities/helpersFun";

import { ListProps } from "../baseComponentsTypes";

// Render list data of obj by given Li component.
function List<T extends Record<string, any>>({
  dataArr,
  LI,
  className,
  children,
  insertChildLast,
  UlProps,
}: ListProps<T> & {
  insertChildLast?: boolean;
}) {
  if (!dataArr[0]) return <> </>;

  const keys = getKeysArrObj(dataArr[0]);
  const key = keys[0] + keys[1];

  return (
    <ul {...UlProps} ref={UlProps?.ref} className={className}>
      {!insertChildLast ? children : ""}
      {dataArr.map((el, i) => (
        <LI index={i} key={`${key}${i}`} {...el} />
      ))}
      {insertChildLast ? children : ""}
    </ul>
  );
}

export default List;
