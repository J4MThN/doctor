"use client";

import { useEffect, useState } from "react";
import { ImageItem, NoteImageDto } from "../types";
import { getMediaUrl } from "@/src/core/utils/media.util";
import { notesService } from "../services/notes.service";

export function usePointImages(noteId: number, noteImages: NoteImageDto[]) {
  const createImages = (images: NoteImageDto[]): ImageItem[] => {
    return images.map((image) => ({
      id: String(image.id),
      src: getMediaUrl(image.url),
    }));
  };

  const [images, setImages] = useState<ImageItem[]>(createImages(noteImages));

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(
    createImages(noteImages)[0] ?? null,
  );

  const [deleteImage, setDeleteImage] = useState<ImageItem | null>(null);

  const [thumbnailStart, setThumbnailStart] = useState(0);

  const canGoPrev = thumbnailStart > 0;
  const canGoNext = thumbnailStart + 3 < images.length;

  // وقتی اطلاعات عکس‌ها از API تغییر کرد
  useEffect(() => {
    const newImages = createImages(noteImages);

    setImages(newImages);
    setSelectedImage(newImages[0] ?? null);
    setThumbnailStart(0);
  }, [noteImages]);

  const handleSelectImage = (image: ImageItem) => {
    setSelectedImage(image);

    const imageIndex = images.findIndex((item) => item.id === image.id);

    if (imageIndex === -1) return;

    if (images.length > 3) {
      if (imageIndex < thumbnailStart) {
        setThumbnailStart(imageIndex);
      } else if (imageIndex >= thumbnailStart + 3) {
        setThumbnailStart(imageIndex - 2);
      }
    }
  };

  const handlePrevImages = () => {
    if (!canGoPrev) return;

    const newStart = thumbnailStart - 1;

    setThumbnailStart(newStart);

    const image = images[newStart];

    if (image) {
      setSelectedImage(image);
    }
  };

  const handleNextImages = () => {
    if (!canGoNext) return;

    const newStart = thumbnailStart + 1;

    setThumbnailStart(newStart);

    const image = images[newStart];

    if (image) {
      setSelectedImage(image);
    }
  };

  // ==============================
  // آپلود عکس جدید از طریق API
  // ==============================
  const handleAddImage = async (file: File) => {
    try {
      await notesService.addImage(noteId, {
        image: file,
      });

      // دوباره اطلاعات نکته را از API می‌گیریم
      // تا ID واقعی عکس جدید را داشته باشیم
      const updatedNote = await notesService.getById(noteId);

      const newImages = createImages(updatedNote.images);

      setImages(newImages);

      const newImage = newImages[newImages.length - 1] ?? null;

      setSelectedImage(newImage);

      if (newImages.length > 3) {
        setThumbnailStart(Math.max(newImages.length - 3, 0));
      }
    } catch (error) {
      console.error("Add note image error:", error);
    }
  };

  // ==============================
  // حذف عکس از طریق API
  // ==============================
  const handleDeleteImage = async () => {
    if (!deleteImage) return;

    try {
      await notesService.deleteImage(Number(deleteImage.id));

      const newImages = images.filter((item) => item.id !== deleteImage.id);

      setImages(newImages);

      if (selectedImage?.id === deleteImage.id) {
        setSelectedImage(newImages[0] ?? null);
      }

      const maxStart = Math.max(newImages.length - 3, 0);

      setThumbnailStart((prev) => Math.min(prev, maxStart));

      setDeleteImage(null);
    } catch (error) {
      console.error("Delete note image error:", error);
    }
  };

  return {
    images,
    selectedImage,
    deleteImage,
    thumbnailStart,

    canGoPrev,
    canGoNext,

    handleSelectImage,
    handlePrevImages,
    handleNextImages,
    handleAddImage,
    handleDeleteImage,

    setDeleteImage,
  };
}
