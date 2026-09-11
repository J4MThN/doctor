import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import {
  CategoryArticleResponseDto,
  CreateCategoryArticleRequestDto,
  UpdateCategoryArticleRequestDto,
} from "../types";

class CategoryArticlesService {
  async getAll(): Promise<CategoryArticleResponseDto[]> {
    const response = await axiosInstance.get<CategoryArticleResponseDto[]>(
      ENDPOINTS.CATEGORY_ARTICLES.GET_ALL,
    );

    return response.data;
  }

  async getById(id: number): Promise<CategoryArticleResponseDto> {
    const response =
      await axiosInstance.get<CategoryArticleResponseDto>(
        ENDPOINTS.CATEGORY_ARTICLES.GET_BY_ID(id),
      );

    return response.data;
  }

  async create(
    data: CreateCategoryArticleRequestDto,
  ): Promise<CategoryArticleResponseDto> {
    const response =
      await axiosInstance.post<CategoryArticleResponseDto>(
        ENDPOINTS.CATEGORY_ARTICLES.CREATE,
        data,
      );

    return response.data;
  }

  async update(
    id: number,
    data: UpdateCategoryArticleRequestDto,
  ): Promise<void> {
    await axiosInstance.put(
      ENDPOINTS.CATEGORY_ARTICLES.UPDATE(id),
      data,
    );
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(
      ENDPOINTS.CATEGORY_ARTICLES.DELETE(id),
    );
  }
}

export const categoryArticlesService =
  new CategoryArticlesService();