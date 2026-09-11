
"use client";

import { useCallback, useEffect, useState } from "react";
import { ArticleResponseDto } from "../types";
import { articlesService } from "../services/articles.service";

export const useArticles = (type?: string) => {
  const [articles, setArticles] = useState<ArticleResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await articlesService.getAll(type);

      setArticles(response);
    } catch (error) {
      console.error("Get articles error:", error);

      setError("خطا در دریافت لیست مقالات.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return {
    articles,
    loading,
    error,
    refetch: getArticles,
  };
};