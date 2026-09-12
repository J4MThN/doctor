"use client";

import { useState } from "react";
import { articlesService } from "../services/articles.service";
import { ArticleResponseDto, UpdateArticleRequestDto } from "../types";

export const useEditArticle = () => {
  const [article, setArticle] = useState<ArticleResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getArticle = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await articlesService.getById(id);
      setArticle(response);
    } catch (error) {
      console.error("Get article error:", error);
      setError("خطا در دریافت مقاله.");
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (
    id: number,
    data: UpdateArticleRequestDto,
  ) => {
    try {
      setLoading(true);
      setError(null);

      await articlesService.update(id, data);

      return true;
    } catch (error) {
      console.error("Update article error:", error);
      setError("خطا در ویرایش مقاله.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    article,
    loading,
    error,
    getArticle,
    updateArticle,
  };
};