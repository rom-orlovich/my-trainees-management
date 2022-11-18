import { useEffect, useState } from "react";

export function useDebounceHook<T>(value: T, sec: number) {
  const [debounceState, setDebounceState] = useState<T>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceState(value);
    }, sec);

    return () => {
      clearTimeout(timer);
    };
  }, [value, sec]);
  if (debounceState) return debounceState;
  return value;
}
