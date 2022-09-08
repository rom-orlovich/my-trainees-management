import React, { useEffect } from "react";

function useTrackValues(arg: any) {
  useEffect(() => {
    console.log(arg);
  }, [arg]);
}

export default useTrackValues;
