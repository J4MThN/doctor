import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";
import { UserProfile } from "@/src/core/types/auth.types";

export const userService = {
  getMe: async (): Promise<UserProfile> => {
    const { data } = await axiosInstance.get<UserProfile>(
      ENDPOINTS.USERS.ME
    );

    return data;
  },
};