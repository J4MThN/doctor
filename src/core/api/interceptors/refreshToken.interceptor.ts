

import {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { axiosInstance } from "../axiosInstance";

import { refreshToken } from "@/src/core/api/refresh/refresh.manager";

import { removeToken } from "@/src/core/utils/token.util";

interface RetryConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setupRefreshTokenInterceptor = (): void => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error: AxiosError) => {
      const originalRequest =
        error.config as RetryConfig | undefined;

      const status = error.response?.status;

      if (!originalRequest || status !== 401) {
        return Promise.reject(error);
      }

      const url = originalRequest.url ?? "";

      const isLoginRequest =
        url.includes("/auth/login");

      const isRegisterRequest =
        url.includes("/auth/register");

      if (isLoginRequest || isRegisterRequest) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        removeToken();

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newAccessToken =
          await refreshToken();

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        removeToken();

        return Promise.reject(refreshError);
      }
    }
  );
};