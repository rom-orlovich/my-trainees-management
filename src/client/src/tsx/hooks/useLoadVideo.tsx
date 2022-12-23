import React, { useState } from "react";
import { AnyFun } from "../types";

function useLoadVideo({
  VideoEl,
}: {
  VideoEl: ({ onLoadedData }: { onLoadedData?: AnyFun }) => JSX.Element;
}) {
  const [loadingState, setLoadingState] = useState(true);
  return {
    VideoEl: () => (
      <VideoEl
        onLoadedData={() => {
          setLoadingState(false);
        }}
      />
    ),

    loadingState,
  };
}

export default useLoadVideo;
