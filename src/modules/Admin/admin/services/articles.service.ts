import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import {
  CreateArticleRequestDto,
  UpdateArticleRequestDto,
  AddArticleImageRequestDto,
  ArticleResponseDto,
} from "../types";

class ArticlesService {
  async getAll(type?: string): Promise<ArticleResponseDto[]> {
    const response = await axiosInstance.get<ArticleResponseDto[]>(
      ENDPOINTS.ARTICLES.GET_ALL,
      { params: type ? { type } : undefined },
    );
    return response.data;
  }

  async getById(id: number): Promise<ArticleResponseDto> {
    const response = await axiosInstance.get<ArticleResponseDto>(
      ENDPOINTS.ARTICLES.GET_BY_ID(id),
    );
    return response.data;
  }

  async create(data: CreateArticleRequestDto): Promise<ArticleResponseDto> {
    const response = await axiosInstance.post<ArticleResponseDto>(
      ENDPOINTS.ARTICLES.CREATE,
      data,
    );
    return response.data;
  }

  async update(id: number, data: UpdateArticleRequestDto): Promise<void> {
    await axiosInstance.put(ENDPOINTS.ARTICLES.UPDATE(id), data);
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(ENDPOINTS.ARTICLES.DELETE(id));
  }

  async addImage(
    id: number,
    data: AddArticleImageRequestDto,
  ): Promise<void> {
    const formData = new FormData();
    formData.append("Image", data.image);

    await axiosInstance.post(
      ENDPOINTS.ARTICLES.ADD_IMAGE(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  }
}

export const articlesService = new ArticlesService();