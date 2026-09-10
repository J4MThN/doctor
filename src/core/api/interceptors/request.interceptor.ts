
import { axiosInstance } from "../axiosInstance";

import { getToken } from "@/src/core/utils/token.util";

export const setupRequestInterceptor = (): void => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );
};