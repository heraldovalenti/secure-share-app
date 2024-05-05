import { useCallback, useEffect, useMemo, useState } from "react";

export const useRequestPermission = () => {
  const [allowed, setAllowed] = useState(0);

  const request = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      setAllowed(1);
    } catch (e) {
      console.log(e);
      setAllowed(2);
    }
  }, []);
  useEffect(() => {
    if (allowed === 0) {
      request();
    }
  }, [allowed, request]);

  const result = useMemo(() => {
    switch (allowed) {
      case 1:
        return "ALLOWED";
      case 2:
        return "NOT_ALLOWED";
      case 0:
      default:
        return "NOT_REQUESTED";
    }
  }, [allowed]);

  return {
    status: result,
    isAllowed: result === "ALLOWED",
    isRequested: result !== "NOT_REQUESTED",
  };
};
