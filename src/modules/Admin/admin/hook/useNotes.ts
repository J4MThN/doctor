"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { NoteDto } from "../types";
import { notesService } from "../services/notes.service";

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await notesService.getAll();

      setNotes(response);
    } catch (error) {
      console.error("Get notes error:", error);

      setError("خطا در دریافت لیست نکات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return {
    notes,
    loading,
    error,
    refetch: getNotes,
  };
};