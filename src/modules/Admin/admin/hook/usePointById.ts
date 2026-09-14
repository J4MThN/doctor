"use client";

import { useCallback, useEffect, useState } from "react";
import { NoteDto } from "../types";
import { notesService } from "../services/notes.service";

export const usePointById = (id?: string) => {
  const [note, setNote] = useState<NoteDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNote = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await notesService.getById(Number(id));

      setNote(response);
    } catch (error) {
      console.error("Get note error:", error);

      setError("خطا در دریافت نکته.");
    } finally {
      setLoading(false);
    }
  }, [id]);
  // حذف نکته
  const deleteNote = async (noteId: number) => {
    try {
      setError(null);

      await notesService.delete(noteId);

      return true;
    } catch (error) {
      console.error("Delete note error:", error);

      setError("خطا در حذف نکته.");

      return false;
    }
  };

  useEffect(() => {
    getNote();
  }, [getNote]);

  return {
    note,
    loading,
    error,
    refetch: getNote,
    deleteNote,
  };
};
