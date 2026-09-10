"use client";

import { useState } from "react";

export interface PointImageItem {
  id: string;
  src: string;
  file: File;
}

export function useAddPointImages() {
  const [images, setImages] = useState<PointImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<PointImageItem | null>(
    null,
  );
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const maxImages = 10;
  const canGoPrev = thumbnailStart > 0;
  const canGoNext = thumbnailStart + 3 < images.length;

  const handleAddImage = (file: File) => {
    if (images.length >= maxImages) return;
    const newImage: PointImageItem = {
      id: crypto.randomUUID(),
      src: URL.createObjectURL(file),
      file,
    };

    setImages((prev) => {
      const newImages = [...prev, newImage];
      if (newImages.length === 1) {
        setSelectedImage(newImage);
      }
      return newImages;
    });
    setSelectedImage(newImage);
    if (images.length >= 3) {
      setThumbnailStart(images.length - 2);
    }
  };

  const handleSelectImage = (image: PointImageItem) => {
    setSelectedImage(image);
    const index = images.findIndex((item) => item.id === image.id);
    if (index === -1) return;
    if (index < thumbnailStart) {
      setThumbnailStart(index);
    } else if (index >= thumbnailStart + 3) {
      setThumbnailStart(index - 2);
    }
  };

  const handlePrevImages = () => {
    if (!canGoPrev) return;
    const newStart = thumbnailStart - 1;
    setThumbnailStart(newStart);
    if (images[newStart]) {
      setSelectedImage(images[newStart]);
    }
  };

  const handleNextImages = () => {
    if (!canGoNext) return;
    const newStart = thumbnailStart + 1;
    setThumbnailStart(newStart);
    if (images[newStart]) {
      setSelectedImage(images[newStart]);
    }
  };

  const handleDeleteImage = () => {
    if (!selectedImage) return;
    const deletedIndex = images.findIndex(
      (item) => item.id === selectedImage.id,
    );
    if (deletedIndex === -1) return;
    URL.revokeObjectURL(selectedImage.src);
    const newImages = images.filter((item) => item.id !== selectedImage.id);

    setImages(newImages);
    if (newImages.length === 0) {
      setSelectedImage(null);
      setThumbnailStart(0);
      return;
    }

    const nextIndex = Math.min(deletedIndex, newImages.length - 1);
    setSelectedImage(newImages[nextIndex]);
    const maxStart = Math.max(newImages.length - 3, 0);
    setThumbnailStart((prev) => Math.min(prev, maxStart));
  };

  return {
    images,
    selectedImage,
    thumbnailStart,
    canGoPrev,
    canGoNext,
    handleAddImage,
    handleSelectImage,
    handlePrevImages,
    handleNextImages,
    handleDeleteImage,
  };
}
