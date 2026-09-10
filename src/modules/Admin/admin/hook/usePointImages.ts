"use client";

import { useState } from "react";

import { pointImage } from "../data/pointImage";
import { ImageItem } from "../types";

export function usePointImages(pointId: string) {
  const originalImages = pointImage[pointId] ?? [];

  const [images, setImages] = useState<ImageItem[]>(
    originalImages.map((image, index) => ({
      id: `${pointId}-${index}`,
      src: image,
    })),
  );

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(
    originalImages.length
      ? {
          id: `${pointId}-0`,
          src: originalImages[0],
        }
      : null,
  );

  const [deleteImage, setDeleteImage] = useState<ImageItem | null>(null);

  const [thumbnailStart, setThumbnailStart] = useState(0);

  const canGoPrev = thumbnailStart > 0;
  const canGoNext = thumbnailStart + 3 < images.length;

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

  const handleAddImage = (file: File) => {
    const newImage: ImageItem = {
      id: crypto.randomUUID(),
      src: URL.createObjectURL(file),
    };

    setImages((prev) => [...prev, newImage]);
    setSelectedImage(newImage);

    if (images.length >= 3) {
      setThumbnailStart(images.length - 2);
    }
  };

  const handleDeleteImage = () => {
    if (!deleteImage) return;

    const newImages = images.filter((item) => item.id !== deleteImage.id);

    setImages(newImages);

    if (selectedImage?.id === deleteImage.id) {
      setSelectedImage(newImages[0] ?? null);
    }

    const maxStart = Math.max(newImages.length - 3, 0);

    setThumbnailStart((prev) => Math.min(prev, maxStart));

    setDeleteImage(null);
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
