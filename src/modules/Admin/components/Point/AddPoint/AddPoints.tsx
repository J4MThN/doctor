"use client";

import { useRef, useState } from "react";
import { ConfigProvider, Input } from "antd";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import { useAddPointImages } from "../../../hook/useAddPointImages";
import PointImage from "./PointImage";
import { useRouter } from "next/navigation";

export const AddPoint = () => {
  const router = useRouter();

  const iconInputRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconName, setIconName] = useState("");

  const handleIconClick = () => {
    iconInputRef.current?.click();
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      console.log("عنوان وارد نشده");
      return;
    }
    if (!icon) {
      console.log("آیکون انتخاب نشده");
      return;
    }
    console.log("ثبت نکته:", {
      title,
      desc,
      icon,
      images,
    });

    router.push("/note");
  };

  const handleCancel = () => {
    setTitle("");
    setDesc("");
    setIcon(null);
    setIconName("");

    console.log("انصراف");
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIcon(file);
    setIconName(file.name);
    event.target.value = "";
  };
  const {
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
  } = useAddPointImages();

  return (
    <ConfigProvider>
      <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB] flex flex-row items-start">
        <div className="flex flex-col mr-6">
          <span className="flex mt-4 mr-4 font-bold text-[#6666C6] text-[16px] ml-2">
            {" "}
            نکته جدید{" "}
          </span>
          <div className="w-153.75 h-115.5 rounded-3xl bg-white px-5 py-4 mt-4 border border-[#F3F2F2]">
            <div className="w-full">
              <label className="block text-[12px] text-[#606060] mb-2">
                آیکون
              </label>

              <div className=" flex items-center gap-4">
                <Input
                  value={iconName}
                  readOnly
                  placeholder="فایل خود را انتخاب کنید"
                  className="font-input-article w-109! h-12! bg-[#F9F9FB]! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]!"
                />

                <button
                  type="button"
                  onClick={handleIconClick}
                  className={`
                    w-34 h-12 rounded-lg text-white text-[14px] flex items-center justify-center gap-2 cursor-pointer ${
                      icon ? "bg-[#6666C6]" : "bg-[#80838D]"
                    }`}
                >
                  <HugeiconsIcon
                    icon={icon ? Tick02Icon : Upload01Icon}
                    size={24}
                    strokeWidth={1.5}
                    color="#FFFFFF"
                  />

                  <span> {icon ? "آپلود شد" : "آپلود فایل"}</span>
                </button>
                <input
                  ref={iconInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleIconChange}
                />
              </div>
            </div>

            <div className="w-full mt-6">
              <label className="block text-[12px] text-[#606060] mb-2">
                عنوان
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان مورد نظر را وارد کنید"
                className="font-input-article w-xl! h-12! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]!"
              />
            </div>

            <div className="w-full mt-6">
              <label className="block text-[12px] text-[#606060] mb-2">
                توضیحات
              </label>

              <Input.TextArea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="توضیحات مورد نظر را وارد کنید"
                className="font-input-article w-xl! h-28.75! pr-2! pt-2! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]! resize-none!"
              />
            </div>

            <div className="flex items-end justify-end gap-3 mt-9">
              <button
                type="button"
                onClick={handleCancel}
                className="w-37.5 h-11 rounded-lg bg-white border border-[#80838D] text-[#80838D] text-[16px] cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-37.5 h-11 rounded-lg bg-[#FF657D] text-white text-[16px] cursor-pointer"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col mr-24">
          <span className="flex mt-4 mr-4 font-bold text-[#6666C6] text-[16px] ml-2">
            {" "}
            افزودن عکس{" "}
            <span className="text-[14px] font-light text-[#80838D] mt-1 mr-2">
              (حداکثر ۱۰ عکس)
            </span>
          </span>
          <PointImage
            images={images}
            selectedImage={selectedImage}
            thumbnailStart={thumbnailStart}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onAddImage={handleAddImage}
            onSelectImage={handleSelectImage}
            onPrev={handlePrevImages}
            onNext={handleNextImages}
            onDelete={handleDeleteImage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
