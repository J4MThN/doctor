 
import { LoginResponse } from "@/src/modules/Authentication/login/types/auth.types";
import { refreshAxios } from "./refreshAxios";
import { ENDPOINTS } from "../../config";

export const refreshAccessToken =
  async (): Promise<LoginResponse> => {
    const { data } =
      await refreshAxios.post<LoginResponse>(
        ENDPOINTS.AUTH.REFRESH
      );

    return data;
  };