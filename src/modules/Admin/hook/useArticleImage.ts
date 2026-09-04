"use client";

import { useState } from "react";
import { article } from "../data/users";

export function useArticleImage(articleId: string) {
  const selectedArticle = article.find(
    (item) => String(item.key) === String(articleId),
  );

  const originalImage = selectedArticle?.icon ?? null;
  const [image, setImage] = useState<any | null>(originalImage);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const handleAddImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setIsDeleted(false);
  };
  const handleDeleteImage = () => {
    setImage(null);
    setIsDeleted(true);
    setDeleteImage(false);
  };

  return {
    image,
    isDeleted,
    deleteImage,

    handleAddImage,
    handleDeleteImage,

    setDeleteImage,
  };
}
