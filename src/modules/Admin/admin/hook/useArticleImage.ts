"use client";

import { useState } from "react";
import { articlesService } from "../services/articles.service";

export function useArticleImage() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (articleId: number, file: File) => {
    setUploading(true);
    setError(null);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      await articlesService.addImage(articleId, { image: file });
    } catch (err) {
      console.error("Add article image error:", err);
      setError("خطا در آپلود تصویر.");
    } finally {
      setUploading(false);
    }
  };

  return {
    image,
    uploading,
    error,
    uploadImage,
  };
}