import { useEffect, useRef } from "react";
import { AnyFun } from "../types";

export function useObserver<E extends HTMLElement, L extends HTMLElement>(
  observerTarget: React.MutableRefObject<E | null>,
  observerRoot: React.MutableRefObject<L | null>,
  fn: AnyFun
) {
  useEffect(() => {
    let el: Element | undefined;

    const observer = new IntersectionObserver(
      (enteries) => {
        if (!observerRoot.current) return;
        if (enteries[0].isIntersecting) {
          fn();
        }
      },
      {
        root: observerRoot.current,
        rootMargin: "10px",
        threshold: 0,
      }
    );

    if (observerTarget.current) {
      el = observerTarget.current;
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fn, observerTarget, observerRoot]);
}
