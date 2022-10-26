import React, { ChangeEvent, useState } from "react";

function useOnChangeInput<T extends Record<string, any>>(defaultValue: T) {
  const [state, setQueryState] = useState(defaultValue);

  const onChange = <T extends { id: any; value: any }>(e: ChangeEvent<T>) => {
    setQueryState((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  return [state as T, onChange] as const;
}

export default useOnChangeInput;
