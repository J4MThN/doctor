"use client";

import { useCallback, useEffect, useState } from "react";

import { cyclesService } from "../services/cycle.service";
import { CycleDto } from "../types";

export const useCycles = () => {
  const [cycles, setCycles] = useState<CycleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCycles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await cyclesService.getMine();

      setCycles(response);
    } catch (error) {
      console.error("Get cycles error:", error);

      setError("خطا در دریافت لیست سیکل‌ها.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCycles();
  }, [getCycles]);

  return {
    cycles,
    loading,
    error,
    refetch: getCycles,
  };
};
