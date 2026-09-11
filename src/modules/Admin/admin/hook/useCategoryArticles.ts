"use client";

import { useCallback, useEffect, useState } from "react";

import { CategoryArticleResponseDto } from "../types";
import { categoryArticlesService } from "../services/categoryArticles.service";

export const useCategoryArticles = () => {
  const [categories, setCategories] = useState<
    CategoryArticleResponseDto[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoryArticlesService.getAll();

      setCategories(response);
    } catch (error) {
      console.error("Get article categories error:", error);

      setError("خطا در دریافت لیست دسته‌بندی مقالات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return {
    categories,
    loading,
    error,
    refetch: getCategories,
  };
};