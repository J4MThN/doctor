import { refreshAccessToken } from "./refresh.service";

import {
  removeToken,
  setToken,
} from "@/src/core/utils/token.util";

let refreshPromise: Promise<string> | null = null;

export const refreshToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await refreshAccessToken();

      const newAccessToken = response.accessToken;

      setToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      removeToken();

      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};