import { useState } from "react";
import { PropsBasic } from "../components/baseComponents/baseComponentsTypes";

export function usePaginationButtons() {
  const [numPage, setNumPage] = useState(1);

  const ButtonLeft = ({ className }: PropsBasic) =>
    numPage > 1 ? (
      <button
        className={className}
        onClick={() => setNumPage((value) => value - 1)}
      >
        Page {numPage - 1}
      </button>
    ) : (
      <></>
    );
  const ButtonRight = ({ className }: PropsBasic) => (
    <button
      className={className}
      onClick={() => setNumPage((value) => value + 1)}
    >
      Page {numPage + 1}
    </button>
  );

  return {
    setNumPage,
    ButtonLeft,
    ButtonRight,
    numPage,
  };
}
