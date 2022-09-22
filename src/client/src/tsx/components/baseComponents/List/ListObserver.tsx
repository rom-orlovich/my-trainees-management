import React, { useRef } from "react";
import { useObserver } from "../../../hooks/useObserver";
import { useCallBackFun } from "../../../hooks/utilitiesHooks";
import { AnyFun } from "../../../types";
import { ListProps } from "../baseComponentsTypes";
import List from "./List";

function ListObserver<T extends Record<string, any>>({
  fn,

  listProps,
}: {
  fn: AnyFun;
  optionsObserver?: IntersectionObserverInit;
  listProps: ListProps<T>;
}) {
  const lastEl = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<null | HTMLUListElement>(null);

  const observerFn = useCallBackFun(() => {
    fn();
  });

  useObserver(lastEl, listRef, observerFn);
  return (
    <List<T>
      ulProps={{ ref: listRef, ...listProps.ulProps }}
      {...listProps}
      insertChildLast={true}
    >
      <div ref={lastEl} />
    </List>
  );
}

export default ListObserver;
