"use client";

import { useCallback, useEffect, useState } from "react";

import { CycleDto } from "../types";
import { cyclesService } from "../services/cycle.service";

export const useCyclesByUserId = (userId: string) => {
  const [cycles, setCycles] = useState<CycleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCycles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await cyclesService.getByUserId(Number(userId));

      setCycles(response);
    } catch (error) {
      console.error("Get user cycles error:", error);
      setError("خطا در دریافت لیست سیکل ها.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    getCycles();
  }, [userId, getCycles]);

  return {
    cycles,
    loading,
    error,
    refetch: getCycles,
  };
};
