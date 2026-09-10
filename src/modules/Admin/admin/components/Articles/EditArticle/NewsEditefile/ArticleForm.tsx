"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { Select } from "antd";

interface ArticleFormProps {
  title: string;
  subject: string;
  desc: string;
  onSubjectChange : (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ArticleForm({
  title,
    subject,
  desc,
  onSubjectChange,
  onTitleChange,
  onDescChange,
  onSubmit,
  onCancel,
}: ArticleFormProps) {

  return (
    <div className="w-153.75 h-115.5 bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div className="w-full">
        <label className="block text-[12px] text-[#1C2024] mb-2">عنوان</label>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className=" w-full h-12 rounded-lg border border-[#6666C6] bg-[#F9F9FB] px-4 text-[13px] text-[#6666C6] outline-none"
        />
      </div>
      <div className="w-full mt-6">
        <label className="block text-[12px] text-[#1C2024] mb-2">موضوع</label>
        <Select
          value= {subject}
          suffixIcon={
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={22}
              color="#6666C6"
              strokeWidth={1.5}
            />
          }
          className="font-input-article w-full! h-12! rounded-lg! border-[#6666C6]! bg-[#F9F9FB]! text-[12px]! text-[#6666C6]!"
          onChange={onSubjectChange}
          options={[
            {
              value: "عمومی",
              label: "عمومی",
            },
            {
              value: "تخصصی",
              label: "تخصصی",
            },
          ]}
        />
      </div>
      <div className="w-full mt-6">
        <label className="block text-[12px] text-[#1C2024] mb-2">توضیحات</label>
        <textarea
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          className=" w-full h-28.75 resize-none rounded-lg border border-[#6666C6] bg-[#F9F9FB] p-4 text-[12px] leading-6 text-[#6666C6] outline-none"
        />
      </div>

      <div className="flex gap-3 justify-end mt-9">
        <button
          type="button"
          onClick={onCancel}
          className="w-38 h-12 rounded-lg border border-[#80838D] bg-white text-[#80838D] text-[14px] cursor-pointer"
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="w-38 h-12 rounded-lg bg-[#FF657D] text-white text-[16px] font-medium cursor-pointer"
        >
          ویرایش
        </button>
      </div>
    </div>
  );
}
