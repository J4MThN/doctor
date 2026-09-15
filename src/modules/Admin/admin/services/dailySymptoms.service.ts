import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import { DailySymptomDto, CreateDailySymptomRequestDto } from "../types";

class DailySymptomsService {
  async getByCycleId(cycleId: number): Promise<DailySymptomDto[]> {
    const response = await axiosInstance.get<DailySymptomDto[]>(
      ENDPOINTS.DAILY_SYMPTOMS.GET_BY_CYCLE_ID(cycleId),
    );

    return response.data;
  }

  async getMine(): Promise<DailySymptomDto[]> {
    const response = await axiosInstance.get<DailySymptomDto[]>(
      ENDPOINTS.DAILY_SYMPTOMS.GET_MINE,
    );

    return response.data;
  }

  async create(data: CreateDailySymptomRequestDto): Promise<DailySymptomDto> {
    const response = await axiosInstance.post<DailySymptomDto>(
      ENDPOINTS.DAILY_SYMPTOMS.CREATE,
      data,
    );

    return response.data;
  }
}

export const dailySymptomsService = new DailySymptomsService();
