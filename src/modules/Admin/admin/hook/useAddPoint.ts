"use client";

import { useState } from "react";
import { notesService } from "../services/notes.service";

export const useAddPoint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPoint = async (title: string, desc: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await notesService.create({ title,desc,});

      return response;
    } catch (error) {
      console.error("Create note error:", error);

      setError("خطا در ثبت نکته.");

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPoint,
    loading,
    error,
  };
};
