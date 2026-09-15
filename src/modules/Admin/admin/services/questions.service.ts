import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import { QuestionDto } from "../types";

class QuestionsService {
  async getAll(): Promise<QuestionDto[]> {
    const response = await axiosInstance.get<QuestionDto[]>(
      ENDPOINTS.QUESTIONS.GET_ALL,
    );

    return response.data;
  }

  async getById(id: number): Promise<QuestionDto> {
    const response = await axiosInstance.get<QuestionDto>(
      ENDPOINTS.QUESTIONS.GET_BY_ID(id),
    );

    return response.data;
  }
}

export const questionsService = new QuestionsService();
