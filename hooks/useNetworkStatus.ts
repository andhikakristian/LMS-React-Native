// hooks/useNetworkStatus.ts
import { useCallback } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";

export function useNetworkStatus() {
  const checkConnection = useCallback(async () => {
    try {
      await axios.get(`${SERVER_URI}/ping`, {
        timeout: 5000,
      });
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  return { checkConnection };
}
