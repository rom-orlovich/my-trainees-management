import React, { useEffect, useState } from "react";
import { useCallBackFun } from "./utilitiesHooks";

function useHideUnFocusElement<E extends HTMLElement>(
  wrapperRef: React.MutableRefObject<E | null>
) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    // Set the visible state true if event of onClick was excute inside
    // the wrapper element ref.
    setIsVisible(!!wrapperRef?.current?.contains(event.target as HTMLElement));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
}

export default useHideUnFocusElement;
