"use client";

import { useState } from "react";
import { notesService } from "../services/notes.service";
import { UpdateNoteRequestDto } from "../types";

export const useEditNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateNote = async (id: number, data: UpdateNoteRequestDto) => {
    try {
      setLoading(true);
      setError(null);

      await notesService.update(id, data);

      return true;
    } catch (error) {
      console.error("Update note error:", error);

      setError("خطا در ویرایش نکته.");

      return false;
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (id: number, file: File) => {
    try {
      setError(null);

      await notesService.addImage(id, {
        image: file,
      });

      return true;
    } catch (error) {
      console.error("Add note image error:", error);

      setError("خطا در افزودن تصویر.");

      return false;
    }
  };

  const deleteImage = async (imageId: number) => {
    try {
      setError(null);

      await notesService.deleteImage(imageId);

      return true;
    } catch (error) {
      console.error("Delete note image error:", error);

      setError("خطا در حذف تصویر.");

      return false;
    }
  };

  return {
    updateNote,
    addImage,
    deleteImage,
    loading,
    error,
  };
};
