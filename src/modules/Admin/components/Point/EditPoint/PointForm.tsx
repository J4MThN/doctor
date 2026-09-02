"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

interface PointFormProps {
  title: string;
  desc: string;
  onTitleChange: (value: string) => void;
  onDescChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function PointForm({
  title,
  desc,
  onTitleChange,
  onDescChange,
  onSubmit,
  onCancel,
}: PointFormProps) {
  return (
    <div className="w-153.75 h-115.5 bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div className="mb-5">
        <label className="block text-[12px] text-[#1C2024] mb-2">آیکون</label>
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className=" w-108 h-12 rounded-lg border border-[#6666C6] bg-[#F9F9FB] px-4 text-[12px] text-[#6666C6] outline-none"
          />
          <button className=" w-35.25 h-12 rounded-lg bg-[#999BA5] flex items-center justify-center">
            <span className="text-white text-[14px] flex leading-[21.9px]">
              <HugeiconsIcon
                icon={Tick02Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="ml-2"
              />{" "}
              آپلود شد
            </span>
          </button>
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-[12px] text-[#1C2024] mb-2">عنوان</label>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className=" w-full h-12 rounded-lg border border-[#6666C6] bg-[#F9F9FB] px-4 text-[13px] text-[#6666C6] outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[12px] text-[#1C2024] mb-2">توضیحات</label>

        <textarea
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          className=" w-full h-30 resize-none rounded-lg border border-[#6666C6] bg-[#F9F9FB] p-4 text-[12px] leading-6 text-[#6666C6] outline-none"
        />
      </div>

      <div className="flex gap-4 justify-end mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="w-38 h-12 rounded-lg border border-[#80838D] bg-white text-[#80838D] text-[14px] "
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="w-38 h-12 rounded-lg bg-[#FF657D] text-white text-[16px] font-medium "
        >
          ویرایش
        </button>
      </div>
    </div>
  );
}
