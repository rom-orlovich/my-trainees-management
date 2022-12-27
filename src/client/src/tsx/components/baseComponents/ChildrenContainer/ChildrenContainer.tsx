import React, { ReactNode } from "react";

export type ComponentFunType<T> = (data: T) => ReactNode;
function ChildrenContainer<T>({
  children,
  className,
  data,
}: {
  data: T;
  className?: string;
  children: ReactNode | ComponentFunType<T>;
}) {
  return (
    <div className={className}>
      {typeof children === "function" ? children(data) : children}
    </div>
  );
}

export default ChildrenContainer;
