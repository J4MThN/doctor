"use client";

import { useCallback, useEffect, useState } from "react";
import { ArticleResponseDto } from "../types";
import { articlesService } from "../services/articles.service";

export const useArticleById = (id?: string) => {
  const [article, setArticle] = useState<ArticleResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getArticle = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await articlesService.getById(Number(id));

      setArticle(response);
    } catch (error) {
      console.error("Get article error:", error);

      setError("خطا در دریافت مقاله.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // حذف مقاله
  const deleteArticle = async (articleId: number) => {
    try {
      setError(null);

      await articlesService.delete(articleId);

      return true;
    } catch (error) {
      console.error("Delete article error:", error);

      setError("خطا در حذف مقاله.");

      return false;
    }
  };

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return {
    article,
    loading,
    error,
    refetch: getArticle,
    deleteArticle,
  };
};
