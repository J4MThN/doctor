"use client";

import { useCallback, useEffect, useState } from "react";

import { DailySymptomDto } from "../types";
import { dailySymptomsService } from "../services/dailySymptoms.service";

export const useDailySymptoms = (cycleId: string) => {
  const [symptoms, setSymptoms] = useState<DailySymptomDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSymptoms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await dailySymptomsService.getByCycleId(Number(cycleId));

      setSymptoms(response);
    } catch (error) {
      console.error("Get daily symptoms error:", error);
      setError("خطا در دریافت علائم روزانه.");
    } finally {
      setLoading(false);
    }
  }, [cycleId]);

  useEffect(() => {
    if (!cycleId) return;

    getSymptoms();
  }, [cycleId, getSymptoms]);

  return {
    symptoms,
    loading,
    error,
    refetch: getSymptoms,
  };
};
