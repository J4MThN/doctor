 
import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export const authService = {
  login: async (
    dto: LoginRequest
  ): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
      ENDPOINTS.AUTH.LOGIN,
      dto
    );

    return data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(
      ENDPOINTS.AUTH.LOGOUT
    );
  },
};
 
