"use client";

import { useCallback, useEffect, useState } from "react";
import { PregnancyDto, UserProfileDto } from "../types";
import { pregnanciesService } from "../services/pregnancies.service";

export interface PregnancyTableData extends PregnancyDto {
  user?: UserProfileDto;
}

export const usePregnancies = () => {
  const [pregnancies, setPregnancies] = useState<PregnancyTableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPregnancies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const pregnancyResponse = await pregnanciesService.getMine();

      const pregnanciesWithUsers = await Promise.all(
        pregnancyResponse.map(async (pregnancy) => {
          try {
            const user = await pregnanciesService.getUserById(pregnancy.userId);

            return {
              ...pregnancy,
              user,
            };
          } catch (error) {
            console.error(`Get user ${pregnancy.userId} error:`, error);

            return {
              ...pregnancy,
              user: undefined,
            };
          }
        }),
      );

      setPregnancies(pregnanciesWithUsers);
    } catch (error) {
      console.error("Get pregnancies error:", error);
      setError("خطا در دریافت لیست افراد.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPregnancies();
  }, [getPregnancies]);

  return {
    pregnancies,
    loading,
    error,
    refetch: getPregnancies,
  };
};
