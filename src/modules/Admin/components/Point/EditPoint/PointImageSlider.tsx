"use client";

import { useRef } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  ImageAdd01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { ImageItem } from "../../../types";

interface PointImageGalleryProps {
  images: ImageItem[];
  selectedImage: ImageItem | null;
  thumbnailStart: number;
  onSelectImage: (image: ImageItem) => void;
  onPrev: () => void;
  onNext: () => void;
  onDelete: (image: ImageItem) => void;
  onAddImage: (file: File) => void;
}

export default function PointImageSlider({
  images,
  selectedImage,
  thumbnailStart,
  onSelectImage,
  onPrev,
  onNext,
  onDelete,
  onAddImage,
}: PointImageGalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleImages = images.slice(thumbnailStart, thumbnailStart + 3);

  const canGoPrev = thumbnailStart > 0;
  const canGoNext = thumbnailStart + 3 < images.length;

  const displayedImages = images.length > 3 ? visibleImages : images;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onAddImage(file);
    e.target.value = "";
  };

  return (
    <div className="w-140 h-118 bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div
        className=" w-78 h-71 rounded-3xl border border-[#DEDEDE]
          overflow-hidden flex mr-10.5"
      >
        {selectedImage ? (
          <Image
            src={selectedImage.src}
            alt="عکس نکته"
            width={451}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[12px] text-[#AEAEB2]">عکسی وجود ندارد</span>
        )}
      </div>

      <div className="flex items-start gap-2 mt-4">
        {images.length > 3 && (
          <button
            type="button"
            onClick={onPrev}
            disabled={!canGoPrev}
            className={`w-8 h-25 flex items-center justify-center shrink-0
              ${canGoPrev ? "text-[#FF657D] cursor-pointer" : "text-[#FF657D]/50"}`}
          >
            <div className="bg-[#FFECEF] w-8 h-8 flex justify-center items-center rounded-full">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                strokeWidth={1.5}
              />
            </div>
          </button>
        )}

        {displayedImages.map((image) => {
          const isSelected = selectedImage?.id === image.id;

          return (
            <div key={image.id} className="flex flex-col items-center shrink-0">
              <button
                type="button"
                onClick={() => onSelectImage(image)}
                className={`border-2 relative w-25 h-25 rounded-xl overflow-hidden  transition-opacity duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "border-[#FF657D] opacity-100"
                      : "border-[#F3F2F2] opacity-70"
                  }`}
              >
                <Image
                  src={image.src}
                  alt="عکس"
                  width={80}
                  height={70}
                  className=" w-full h-full object-cover "
                />

                {isSelected && (
                  <div className="absolute inset-0 bg-[#202020]/45 flex items-center justify-center">
                    <HugeiconsIcon
                      icon={ViewIcon}
                      size={24}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => onDelete(image)}
                className=" mt-2 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={22}
                  strokeWidth={1.7}
                  className="text-[#E51D1D]"
                />
              </button>
            </div>
          );
        })}

        {images.length > 3 && (
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            className={` w-8 h-25 flex items-center justify-center shrink-0
              ${canGoNext ? "text-[#FF657D] cursor-pointer" : "text-[#FF657D]/50"}`}
          >
            <div className="bg-[#FFECEF] w-8 h-8 flex justify-center items-center rounded-full">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={24}
                strokeWidth={1.5}
              />
            </div>
          </button>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="
           w-25 h-25 rounded-xl border border-dashed border-[#6666C6] mr-4
         bg-white flex flex-col items-center justify-center gap-2 shrink-0"
        >
          <HugeiconsIcon
            icon={ImageAdd01Icon}
            size={24}
            strokeWidth={1.5}
            className="text-[#6666C6]"
          />

          <span className="text-[12px] text-[#6666C6]">آپلود عکس</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
