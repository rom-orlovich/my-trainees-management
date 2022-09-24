import React, { useEffect, useState } from "react";
import { useCallBackFun } from "./utilitiesHooks";

function useHideUnFocusElement<E extends HTMLElement>(
  wrapperRef: React.MutableRefObject<E | null>,
  setAlertNotificationON?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    // Set the visible state true if event of onClick was execute inside
    // the wrapper element ref.
    const target = event.target as HTMLElement;
    const deleteNotification = target.closest(
      `svg[class*="AlertsNotification_deleteIcon"]`
    );
    const checkContains = !!wrapperRef?.current?.contains(target);
    setAlertNotificationON && setAlertNotificationON(!!deleteNotification);
    setIsVisible(checkContains);
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
