import React, { ReactNode } from "react";

export type ComponentFunType<T> = (data: T) => ReactNode;
function ChildrenFunComponent<T>({
  children,
  className,
  data,
}: {
  data: T;
  className?: string;
  children: ReactNode | ComponentFunType<T>;
}) {
  return <>{typeof children === "function" ? children(data) : children} </>;
}

export default ChildrenFunComponent;
