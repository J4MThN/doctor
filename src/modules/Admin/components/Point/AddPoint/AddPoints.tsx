"use client";

import { useRef, useState } from "react";
import { ConfigProvider, Input, Select } from "antd";
import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";
import { ImageUploadIcon } from "@hugeicons/core-free-icons";
import Imagedefault from "@/src/assest/defualimage/Group 162742.svg";

export const AddPoints = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <ConfigProvider>
      <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB] flex flex-row items-start">
        <div className="flex flex-col mr-6">
          <span className="flex mt-4 mr-4 font-bold text-[#6666C6] text-[16px] ml-2">
            {" "}
            افزودن مقاله جدید
          </span>
          <div className="w-153.75 h-115.5 rounded-3xl bg-white px-5 py-4 mt-4">
            <div className="w-full">
              <label className="block text-[12px] text-[#606060] mb-2">
                عنوان
              </label>
              <Input
                placeholder="عنوان مورد نظر را وارد کنید"
                className="font-input-article w-xl! h-12! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]!"
              />
            </div>

            <div className="w-full mt-6">
              <label className="block text-[12px] text-[#606060] mb-2">
                موضوع
              </label>
              <Select
                defaultValue="موضوع مورد نظر را وارد کنید"
                className="font-input-article w-xl! h-12! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]!"
                onChange={handleChange}
                options={[
                  {
                    value: "1",
                    label: "عمومی",
                  },
                  {
                    value: "2",
                    label: "تخصصی",
                  },
                ]}
              />
            </div>

            <div className="w-full mt-6">
              <label className="block text-[12px] text-[#606060] mb-2">
                توضیحات
              </label>

              <Input.TextArea
                placeholder="توضیحات مورد نظر را وارد کنید"
                className="font-input-article w-xl! h-28.75! pr-2! pt-2! rounded-lg! border-[#E5E5EA]! text-[12px]! text-[#AEAEB2]! resize-none!"
              />
            </div>

            <div className="flex items-end justify-end gap-3 mt-10">
              <button
                type="button"
                className="w-37.5 h-11 rounded-lg bg-white border border-[#80838D] text-[#80838D] text-[16px] cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="button"
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
          </span>
          <div className="w-110 h-114 rounded-3xl bg-white flex flex-col items-center border border-[#F3F2F2] px-5 py-4 mt-4">
            <div className="w-71 h-71 mt-3 rounded-[20px] border border-[#E5E5EA] overflow-hidden flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt="article"
                  width={284}
                  height={284}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={Imagedefault}
                  alt="article"
                  width={251}
                  height={252}
                  className="mt-10"
                />
              )}
            </div>

            <button
              type="button"
              onClick={handleImageClick}
              className="w-25 h-25 mt-4 rounded-2xl border border-dashed border-[#6666C6] bg-white flex flex-col items-center justify-center cursor-pointer"
            >
              <HugeiconsIcon
                icon={ImageUploadIcon}
                size={24}
                strokeWidth={1.5}
                color="#6666C6"
              />

              <span className="text-[12px] text-[#6666C6] mt-2">
                افزودن عکس
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>{" "}
        </div>
      </div>
    </ConfigProvider>
  );
};
