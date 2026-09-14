import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import { CommentResponseDto, CreateCommentRequestDto, PendingCommentResponseDto } from "../types";

class CommentsService {
  async getByArticleId(articleId: number): Promise<CommentResponseDto[]> {
    const response = await axiosInstance.get<CommentResponseDto[]>(
      ENDPOINTS.COMMENTS.GET_BY_ARTICLE_ID(articleId),
    );

    return response.data;
  }

  async getPending(): Promise<PendingCommentResponseDto[]> {
    const response = await axiosInstance.get<PendingCommentResponseDto[]>(
      ENDPOINTS.COMMENTS.GET_PENDING,
    );

    return response.data;
  }

  async create(data: CreateCommentRequestDto): Promise<CommentResponseDto> {
    const response = await axiosInstance.post<CommentResponseDto>(
      ENDPOINTS.COMMENTS.CREATE,
      data,
    );

    return response.data;
  }

  async approve(id: number): Promise<void> {
    await axiosInstance.put(ENDPOINTS.COMMENTS.APPROVE(id));
  }

  async reject(id: number): Promise<void> {
    await axiosInstance.put(ENDPOINTS.COMMENTS.REJECT(id));
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(ENDPOINTS.COMMENTS.DELETE(id));
  }
}

export const commentsService = new CommentsService();
