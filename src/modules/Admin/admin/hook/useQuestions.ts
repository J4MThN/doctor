"use client";

import { useCallback, useEffect, useState } from "react";

import { QuestionDto } from "../types";
import { questionsService } from "../services/questions.service";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await questionsService.getAll();

      setQuestions(response);
    } catch (error) {
      console.error("Get questions error:", error);
      setError("خطا در دریافت سوالات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return {
    questions,
    loading,
    error,
    refetch: getQuestions,
  };
};
