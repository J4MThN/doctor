"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { points } from "@/src/modules/Admin/data/users";
import { pointImage } from "../../../data/pointImage";
import PointImageSlider from "./PointImageSlider";
import PointForm from "./PointForm";
import DeleteImageModal from "./DeleteImageModal";
import { ImageItem } from "../../../types";

interface EditPointProps {
  id: string;
}

export default function EditPoint({ id }: EditPointProps) {
  const router = useRouter();
  const selectedPoint = points.find((item) => String(item.key) === String(id));

  if (!selectedPoint) {
    return (
      <div dir="rtl" className="flex w-full flex-1 items-center justify-center">
        <span className="text-[14px] text-[#606060]">
          نکته مورد نظر پیدا نشد.
        </span>
      </div>
    );
  }

  return (
    <EditNote
      point={selectedPoint}
      pointId={id}
      onCancel={() => router.push("/note")}
    />
  );
}

interface EditNoteProps {
  point: any;
  pointId: string;
  onCancel: () => void;
}

function EditNote({ point, pointId, onCancel }: EditNoteProps) {
  const router = useRouter();

  const originalImages = pointImage[pointId] ?? [];

  const [title, setTitle] = useState(point.title);
  const [desc, setDesc] = useState(point.desc);

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

  const handleSubmit = () => {
    const index = points.findIndex(
      (item) => String(item.key) === String(pointId),
    );

    if (index === -1) return;

    points[index] = {
      ...points[index],
      title,
      desc,
      image: images.length,
    };

    router.push("/note");
  };

  return (
    <div
      dir="rtl"
      className="w-full flex-1 min-h-0 m-6 rounded-3xl bg-[#F9F9FB]"
    >
      <div className="mt-4 mr-6">
        <div className="flex gap-20">
          {/* Form */}
          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">
              ویرایش نکته
            </span>

            <PointForm
              title={title}
              desc={desc}
              onTitleChange={setTitle}
              onDescChange={setDesc}
              onSubmit={handleSubmit}
              onCancel={onCancel}
            />
          </div>
          {/* Image */}
          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">عکس ها</span>
            <PointImageSlider
              images={images}
              selectedImage={selectedImage}
              thumbnailStart={thumbnailStart}
              onSelectImage={handleSelectImage}
              onPrev={handlePrevImages}
              onNext={handleNextImages}
              onDelete={setDeleteImage}
              onAddImage={handleAddImage}
            />{" "}
          </div>
        </div>
      </div>

      {/* Modal */}

      {deleteImage && (
        <DeleteImageModal
          onConfirm={handleDeleteImage}
          onCancel={() => setDeleteImage(null)}
        />
      )}
    </div>
  );
}
