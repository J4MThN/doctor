import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import { PregnancyDto } from "../types";

class PregnanciesService {
  async getMine(): Promise<PregnancyDto[]> {
    const response = await axiosInstance.get<PregnancyDto[]>(
      ENDPOINTS.PREGNANCIES.GET_MINE,
    );

    return response.data;
  }

  async getUserById(id: number) {
    const response = await axiosInstance.get(ENDPOINTS.USERS.GET_BY_ID(id));

    return response.data;
  }
}

export const pregnanciesService = new PregnanciesService();
