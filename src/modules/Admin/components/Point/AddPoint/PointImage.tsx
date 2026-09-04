"use client";

import { useRef } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Delete02Icon,
  ImageAdd01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import { PointImageItem } from "@/src/modules/Admin/hook/useAddPointImages";
import Image from "next/image";
import Imagedefault from "@/src/assest/defualimage/Group 162742.svg";

interface PointImagesProps {
  images: PointImageItem[];
  selectedImage: PointImageItem | null;
  thumbnailStart: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onAddImage: (file: File) => void;
  onSelectImage: (image: PointImageItem) => void;
  onPrev: () => void;
  onNext: () => void;
  onDelete: () => void;
}

export default function PointImage({
  images,
  selectedImage,
  thumbnailStart,
  canGoPrev,
  canGoNext,
  onAddImage,
  onSelectImage,
  onPrev,
  onNext,
  onDelete,
}: PointImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const visibleImages = images.slice(thumbnailStart, thumbnailStart + 3);
  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onAddImage(file);
    event.target.value = "";
  };

  return (
    <div className="w-full h-full bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div className="flex items-center justify-center">
        <div className=" w-78 h-71 rounded-3xl border border-[#DEDEDE] overflow-hidden flex">
          {selectedImage ? (
            <img
              src={selectedImage.src}
              alt="تصویر نکته"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#80838D] relative w-64 h-64 mt-10 mr-7">
              <Image
                src={Imagedefault}
                alt="article"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4">
        {images.length > 3 && (
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={onPrev}
            className={`w-8 h-25 flex items-center justify-center shrink-0
              ${canGoPrev ? "text-[#FF657D] cursor-pointer" : "text-[#FF657D]/50"}`}
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={24}
              strokeWidth={1.5}
            />
          </button>
        )}
        {visibleImages.map((image) => (
          <div key={image.id} className="flex flex-col items-center shrink-0">
            <button
              type="button"
              onClick={() => onSelectImage(image)}
              className={`
                    border-2 relative w-25 h-25 rounded-xl overflow-hidden  transition-opacity duration-200 cursor-pointer 
                    ${
                      selectedImage?.id === image.id
                        ? "border-[#6666C6] opacity-100"
                        : "border-transparent opacity-70"
                    }`}
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-full object-cover"
              />
              {selectedImage && (
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
              onClick={onDelete}
              className="mt-2 w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <HugeiconsIcon
                icon={Delete02Icon}
                size={22}
                strokeWidth={1.7}
                className="text-[#E51D1D]"
              />
            </button>
          </div>
        ))}

        {images.length > 3 && (
          <button
            type="button"
            disabled={!canGoNext}
            onClick={onNext}
            className={` w-8 h-25 flex items-center justify-center shrink-0
              ${canGoNext ? "text-[#FF657D] cursor-pointer" : "text-[#FF657D]/50"}`}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={24} strokeWidth={1.5} />
          </button>
        )}
        {images.length < 10 && (
          <button
            type="button"
            onClick={handleUpload}
            className="w-25 h-25 rounded-xl border-2 border-dashed border-[#6666C6] bg-white flex flex-col items-center justify-center cursor-pointer"
          >
            <HugeiconsIcon
              icon={ImageAdd01Icon}
              size={24}
              strokeWidth={1.5}
              color="#6666C6"
            />
            <span className="text-[12px] text-[#6666C6] mt-3">افزودن عکس</span>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </div>
  );
}
