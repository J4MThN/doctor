"use client";

import { useCallback, useEffect, useState } from "react";
import { PendingCommentResponseDto } from "../types";
import { commentsService } from "../services/comments.service";

export const useComments = () => {
  const [comments, setComments] = useState<PendingCommentResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await commentsService.getPending();

      setComments(response);
    } catch (error) {
      console.error("Get comments error:", error);

      setError("خطا در دریافت لیست نظرات.");
    } finally {
      setLoading(false);
    }
  }, []);

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
