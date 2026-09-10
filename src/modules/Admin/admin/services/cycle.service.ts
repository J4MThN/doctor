import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";
import { CycleDto } from "../types";

class CyclesService {
  async getMine(): Promise<CycleDto[]> {
    const response = await axiosInstance.get<CycleDto[]>(
      ENDPOINTS.CYCLES.GET_MINE
    );

    return response.data;
  }
}

export const cyclesService = new CyclesService();