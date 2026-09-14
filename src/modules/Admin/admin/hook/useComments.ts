"use client";

import { useCallback, useEffect, useState } from "react";
import { CommentResponseDto } from "../types";
import { commentsService } from "../services/comments.service";

export const useComments = (articleId: number) => {
  const [comments, setComments] = useState<CommentResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await commentsService.getByArticleId(articleId);

      setComments(response);
    } catch (error) {
      console.error("Get comments error:", error);

      setError("خطا در دریافت لیست نظرات.");
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return {
    comments,
    loading,
    error,
    refetch: getComments,
  };
};
