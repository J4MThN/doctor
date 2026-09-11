"use client";

import { useState } from "react";
import { notesService } from "../services/notes.service";
import { NoteDto } from "../types";
import { PointImageItem } from "./useAddPointImages";

export const useAddPoint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPoint = async (
    title: string,
    desc: string,
    icon: File | null,
    images: PointImageItem[],
  ): Promise<NoteDto | null> => {
    if (!icon) {
      setError("لطفاً آیکون را انتخاب کنید.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const note = await notesService.create({ title, desc, icon });

      for (const image of images) {
        await notesService.addImage(note.id, { image: image.file });
      }

      return note;
    } catch (err) {
      console.error("Create note error:", err);
      setError("خطا در ثبت نکته.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPoint, loading, error };
};