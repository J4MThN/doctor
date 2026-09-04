"use client";

import { useRef } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, ImageAdd01Icon } from "@hugeicons/core-free-icons";
import DefualImage from "@/src/assest/defualimage/Group 162742.svg";

interface ArticleImageProps {
  image: any | null;
  isDeleted: boolean;
  onDelete: () => void;
  onAddImage: (file: File) => void;
}

export default function ArticleImage({
  image,
  isDeleted,
  onDelete,
  onAddImage,
}: ArticleImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onAddImage(file);
    e.target.value = "";
  };

  return (
    <div className="w-full h-110 bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div className="flex items-center justify-center">
        <div
          className=" w-71 h-71 rounded-3xl border border-[#DEDEDE]
          overflow-hidden flex"
        >
          {!isDeleted && image ? (
            <Image
              src={image}
              alt="عکس مقاله"
              width={451}
              height={300}
              className="w-full h-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer"
            >
              <Image
                src={DefualImage}
                alt="article"
                width={252}
                height={252}
                className="mt-10"
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 ">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="
           w-25 h-25 rounded-xl border-2 border-dashed border-[#6666C6] mr-4
         bg-white flex flex-col items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <HugeiconsIcon
            icon={ImageAdd01Icon}
            size={24}
            strokeWidth={1.5}
            className="text-[#6666C6]"
          />
          <span className="text-[12px] text-[#6666C6]">آپلود عکس</span>
        </button>

        <div className="flex items-center justify-center h-25 w-12">
          {!isDeleted && image ? (
            <button
              type="button"
              onClick={onDelete}
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <HugeiconsIcon
                icon={Delete02Icon}
                size={24}
                strokeWidth={1.5}
                className="text-[#E51D1D]"
              />
            </button>
          ) : null}
        </div>
        {/*  */}
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
