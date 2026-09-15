"use client";

import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Input, Select, InputNumber } from "antd";
import Image from "next/image";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ImageUploadIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";

import Imagedefault from "@/src/assest/defualimage/Group 162742.svg";

import { useAddArticle } from "../../../hook/useAddArticle";
import { useArticleImage } from "../../../hook/useArticleImage";
import { useCategoryArticles } from "../../../hook/useCategoryArticles";
import SuccessToast from "../../Toast/SuccessToast";

export const AddNews = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ایجاد مقاله
  const { createArticle, loading, error } = useAddArticle();

  // آپلود تصویر مقاله
  const {
    image,
    uploading,
    error: imageError,
    uploadImage,
  } = useArticleImage();

  // دریافت دسته‌بندی‌های مقالات
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoryArticles();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [type, setType] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [timeRead, setTimeRead] = useState<number | null>(null);

  // شناسه مقاله بعد از ایجاد موفق
  const [articleId, setArticleId] = useState<number | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  // مخفی کردن پیام موفقیت بعد از 3 ثانیه
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  // باز کردن file picker
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // انتخاب تصویر
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !articleId) return;

    uploadImage(articleId, file);

    // امکان انتخاب مجدد همان فایل
    event.target.value = "";
  };

  // تغییر نوع مقاله
  const handleTypeChange = (value: string) => {
    setType(value);
  };

  // ثبت مقاله
  const handleSubmit = async () => {
    // اگر قبلاً ثبت شده، دوباره ایجاد نکن
    if (articleId) return;

    // اعتبارسنجی
    if (
      !title.trim() ||
      !desc.trim() ||
      !categoryId ||
      !timeRead ||
      timeRead <= 0
    ) {
      return;
    }

    const result = await createArticle({
      title: title.trim(),
      desc: desc.trim(),
      type: type!,
      categoryId,
      timeRead,
    });

    if (!result) return;

    // ذخیره ID مقاله برای آپلود تصویر
    setArticleId(result.id);

    // نمایش پیام موفقیت
    setShowSuccess(true);
  };

  // انصراف
  const handleCancel = () => {
    setTitle("");
    setDesc("");
    setType(null);
    setCategoryId(null);
    setTimeRead(null);
  };

  return (
    <ConfigProvider>
      <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB] flex flex-row items-start">
        {/* =========================
            فرم اطلاعات مقاله
        ========================== */}
        <div className="flex flex-col mr-6">
          <span className="flex mt-4 mr-4 font-bold text-[#6666C6] text-[16px] ml-2">
            افزودن مقاله جدید
          </span>

          <div className="w-full rounded-3xl bg-white px-5 py-4 mt-4 border border-[#F3F2F2]">
            {/* عنوان */}
            <div className="w-full h-full">
              <label className="block text-[12px] text-[#1C2024] mb-2">
                عنوان
              </label>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!!articleId}
                placeholder="عنوان مورد نظر را وارد کنید"
                className={`font-input-article w-full! h-12! rounded-lg! text-[12px]!
                ${
                  title.trim()
                    ? "border-[#6666C6]! text-[#606060]!"
                    : "border-[#E5E5EA]! text-[#AEAEB2]!"
                }`}
              />
            </div>

            {/* نوع مقاله */}
            <div className="w-full flex gap-4 mt-6">
              <div className="flex-1 min-w-0">
                <label className="block text-[12px] text-[#1C2024] mb-2">
                  موضوع
                </label>
                <Select
                  value={type}
                  onChange={(value) => handleTypeChange(value)}
                  disabled={!!articleId}
                  placeholder="موضوع را انتخاب کنید"
                  allowClear
                  suffixIcon={
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={22}
                      color="#AEAEB2"
                      strokeWidth={1.5}
                    />
                  }
                  className={`font-input-article w-full! h-12! rounded-lg! text-[12px]!
                              ${
                                type
                                  ? "border-[#6666C6]! text-[#606060]!"
                                  : "border-[#E5E5EA]! text-[#AEAEB2]!"
                              }`}
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
              {/* =========================
                دسته‌بندی مقاله
              ========================== */}
              <div className="flex-1 min-w-0">
                <label className="block text-[12px] text-[#1C2024] mb-2">
                  دسته‌بندی
                </label>

                <Select
                  value={categoryId}
                  onChange={(value) => setCategoryId(value)}
                  disabled={!!articleId || categoriesLoading}
                  loading={categoriesLoading}
                  placeholder="دسته‌بندی را انتخاب کنید"
                  allowClear
                  suffixIcon={
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={22}
                      color="#AEAEB2"
                      strokeWidth={1.5}
                    />
                  }
                  className={`font-input-article ont-input-article w-full! h-12! rounded-lg! text-[12px]!
                    ${
                      categoryId
                        ? "border-[#6666C6]! text-[#606060]!"
                        : "border-[#E5E5EA]! text-[#AEAEB2]!"
                    }`}
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                />
              </div>
              {/* زمان مطالعه */}
              <div className="flex-1 min-w-0">
                <label className="block text-[12px] text-[#1C2024] mb-2">
                  زمان مطالعه{" "}
                  <span className="text-[10px] text-[#737373]">(دقیقه)</span>
                </label>

                <InputNumber
                  value={timeRead}
                  onChange={(value) => setTimeRead(value)}
                  disabled={!!articleId}
                  min={1}
                  placeholder="زمان مطالعه را وارد کنید"
                  upHandler={
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      size={14}
                      color="#6666C6"
                    />
                  }
                  downHandler={
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={14}
                      color="#6666C6"
                    />
                  }
                  className={`font-input-article w-full! h-12! rounded-lg! text-[12px]!
                  ${
                    timeRead
                      ? "border-[#6666C6]! text-[#606060]!"
                      : "border-[#E5E5EA]! text-[#AEAEB2]!"
                  }`}
                />
              </div>
            </div>

            {/* توضیحات */}
            <div className="w-full mt-6">
              <label className="block text-[12px] text-[#1C2024] mb-2">
                توضیحات
              </label>

              <Input.TextArea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={!!articleId}
                placeholder="توضیحات مورد نظر را وارد کنید"
                className={`font-input-article w-xl! h-28.75! pr-2! pt-2! rounded-lg! text-[12px]! resize-none!
                  ${
                    desc.trim()
                      ? "border-[#6666C6]! text-[#606060]!"
                      : "border-[#E5E5EA]! text-[#AEAEB2]!"
                  }`}
              />
            </div>

            {/* خطا */}
            {(error || imageError || categoriesError) && (
              <p className="mt-3 text-[12px] text-red-500">
                {error ?? imageError ?? categoriesError}
              </p>
            )}

            {/* موفقیت */}
            <SuccessToast
              open={showSuccess}
              message=" مقاله با موفقیت ثبت شد! حالا عکس را ثبت کنید."
              onClose={() => setShowSuccess(false)}
            />

            {/* دکمه‌ها */}
            <div className="flex items-end justify-end gap-3 mt-9">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading || !!articleId}
                className="w-37.5 h-11 rounded-lg bg-white border border-[#80838D] text-[#80838D] text-[16px] cursor-pointer disabled:opacity-50"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !!articleId || categoriesLoading}
                className="w-37.5 h-11 rounded-lg bg-[#FF657D] text-white text-[16px] cursor-pointer disabled:opacity-50"
              >
                {articleId ? "ثبت شد" : loading ? "در حال ثبت..." : "ثبت"}
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            آپلود تصویر
        ========================== */}
        <div className="flex flex-col mr-24">
          <span className="flex mt-4 mr-4 font-bold text-[#6666C6] text-[16px] ml-2">
            افزودن عکس
          </span>

          <div className="w-full rounded-3xl bg-white flex flex-col items-center border border-[#F3F2F2] px-5 pb-4 pt-2 mt-4">
            {/* تصویر */}
            <div className="w-71 h-71 mt-3 rounded-2xl border border-[#E5E5EA] overflow-hidden flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt="article"
                  width={284}
                  height={284}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-64 h-64 mt-10">
                  <Image
                    src={Imagedefault}
                    alt="article"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* دکمه آپلود */}
            <button
              type="button"
              onClick={handleImageClick}
              disabled={!articleId || uploading}
              className="w-25 h-25 mt-4 rounded-2xl border-2 border-dashed border-[#6666C6] bg-white flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HugeiconsIcon
                icon={ImageUploadIcon}
                size={24}
                strokeWidth={1.5}
                color="#6666C6"
              />

              <span className="text-[12px] text-[#6666C6] mt-2">
                {uploading ? "در حال آپلود..." : "افزودن عکس"}
              </span>
            </button>

            {/* راهنما */}
            {!articleId && (
              <p className="text-[11px] text-[#AEAEB2] mt-2">
                ابتدا مقاله را ثبت کنید
              </p>
            )}

            {/* input فایل */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
