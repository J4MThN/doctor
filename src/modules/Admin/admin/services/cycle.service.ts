import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";
import { CycleDto } from "../types";

class CyclesService {
  async getMine(): Promise<CycleDto[]> {
    const response = await axiosInstance.get<CycleDto[]>(
      ENDPOINTS.CYCLES.GET_MINE,
    );

    return response.data;
  }

  async getAll(): Promise<CycleDto[]> {
    const response = await axiosInstance.get<CycleDto[]>(
      ENDPOINTS.CYCLES.GET_ALL,
    );

    return response.data;
  }

  async getByUserId(userId: number): Promise<CycleDto[]> {
    const response = await axiosInstance.get<CycleDto[]>(
      ENDPOINTS.CYCLES.GET_BY_USER_ID(userId),
    );

    return response.data;
  }
}

export const cyclesService = new CyclesService();
