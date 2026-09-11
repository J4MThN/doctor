"use client";

import { useState } from "react";
import { articlesService } from "../services/articles.service";
import { ArticleResponseDto, CreateArticleRequestDto } from "../types";

export const useAddArticle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArticle = async (
    data: CreateArticleRequestDto,
  ): Promise<ArticleResponseDto | null> => {
    setLoading(true);
    setError(null);

    try {
      const article = await articlesService.create(data);
      return article;
    } catch (err) {
      console.error("Create article error:", err);
      setError("خطا در ثبت مقاله.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createArticle, loading, error };
};