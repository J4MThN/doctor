"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { InputNumber, Select } from "antd";

interface ArticleFormProps {
  title: string;
  subject: string;
  desc: string;
  onSubjectChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;

  categoryId: number | null;
  timeRead: number | null;
  onCategoryChange: (value: number | null) => void;
  onTimeReadChange: (value: number | null) => void;
  categories: {
    id: number;
    name: string;
  }[];
  categoriesLoading: boolean;
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

  categoryId,
  timeRead,
  onCategoryChange,
  onTimeReadChange,
  categories,
  categoriesLoading,
}: ArticleFormProps) {
  return (
    <div className="w-full h-full bg-white border border-[#F3F2F2] rounded-3xl mt-4 p-4">
      <div className="w-full">
        <label className="block text-[12px] text-[#1C2024] mb-2">عنوان</label>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className=" w-full h-12 rounded-lg border border-[#6666C6] bg-[#F9F9FB] px-4 text-[13px] text-[#6666C6] outline-none"
        />
      </div>
      <div className="w-full flex gap-4 mt-6">
        <div className="flex-1 min-w-0">
          <label className="block text-[12px] text-[#1C2024] mb-2">موضوع</label>
          <Select
            value={subject}
            placeholder="موضوع را انتخاب کنید"
            allowClear
            suffixIcon={
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={22}
                color="#6666C6"
                strokeWidth={1.5}
              />
            }
            className="article-select [&_.ant-select-clear_svg]:w-4 [&_.ant-select-clear_svg]:h-4 [&_.ant-select-clear]:ml-2!
                      font-input-article w-full! h-12! rounded-lg! border-[#6666C6]! bg-[#F9F9FB]! text-[12px]! text-[#6666C6]!"
            onChange={onSubjectChange}
            options={[
              {
                value: "Public",
                label: "عمومی",
              },
              {
                value: "Private",
                label: "تخصصی",
              },
            ]}
          />
        </div>

        {/* کد اضافه شده برای دسته‌بندی مقاله */}
        <div className="flex-1 min-w-0">
          <label className="block text-[12px] text-[#1C2024] mb-2">
            دسته‌ بندی
          </label>

          <Select
            value={categoryId}
            onChange={(value) => onCategoryChange(value ?? null)}
            placeholder="دسته‌بندی را انتخاب کنید"
            allowClear
            suffixIcon={
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={22}
                color="#6666C6"
                strokeWidth={1.5}
              />
            }
            className="font-input-article [&_.ant-select-clear_svg]:w-4  [&_.ant-select-clear_svg]:h-4  [&_.ant-select-clear]:ml-2!
                      w-full! h-12! rounded-lg! border-[#6666C6]! bg-[#F9F9FB]! text-[12px]! text-[#6666C6]!"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            loading={categoriesLoading}
          />
        </div>

        {/* کد اضافه شده برای زمان مطالعه */}
        <div className="flex-1 min-w-0">
          <label className="block text-[12px] text-[#1C2024] mb-2">
            زمان مطالعه{" "}
            <span className="text-[10px] text-[#737373]">(دقیقه)</span>
          </label>

          <InputNumber
            value={timeRead}
            onChange={(value) => onTimeReadChange(value)}
            min={1}
            placeholder="زمان مطالعه را وارد کنید"
            upHandler={
              <HugeiconsIcon icon={ArrowUp01Icon} size={14} color="#6666C6" />
            }
            downHandler={
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} color="#6666C6" />
            }
            className="font-input-article w-full! h-12! rounded-lg! border-[#6666C6]! bg-[#F9F9FB]! text-[12px]! "
          />
        </div>
      </div>

      <div className="w-full mt-6">
        <label className="block text-[12px] text-[#1C2024] mb-2">توضیحات</label>
        <textarea
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          className="w-full h-28.75 resize-none rounded-lg border border-[#6666C6] bg-[#F9F9FB] p-4 text-[12px] leading-6 text-[#6666C6] outline-none"
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
