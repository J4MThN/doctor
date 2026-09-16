"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Spin } from "antd";
import { CommentResponseDto } from "../../../types/comment.types";

import ImageComment from "@/src/assest/defualimage/comment.svg";
import Image from "next/image";

interface ArticleCommentsModalProps {
  open: boolean;
  articleTitle: string;
  comments: CommentResponseDto[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function ModalArticleComment({
  open,
  articleTitle,
  comments,
  loading,
  error,
  onClose,
}: ArticleCommentsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        dir="rtl"
        className="w-200 min-h-60 rounded-3xl bg-white flex flex-col"
      >
        <div className="flex items-center justify-between pt-6 px-6">
          <div className="flex items-start justify-start">
            <button type="button" onClick={onClose} className="cursor-pointer">
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={24}
                strokeWidth={2}
                className="text-[#FF657D]"
              />
            </button>
          </div>
        </div>
        <div className="flex item-start p-6 bg-[#FFECEF] mt-4 mb-2">
          <h2 className="text-[16px] font-bold text-[#6666C6] pr-2">
            {" "}
            لیست نظرات مقاله ی{" "}
          </h2>
          <span className="text-[16px] font-bold text-[#808080] mr-2">
            ({articleTitle})
          </span>
        </div>

        <div className="p-6 flex-1 min-h-0">
          {loading ? (
            <div className="flex justify-center py-10">
              <Spin />
            </div>
          ) : error ? (
            <div className="flex justify-center py-10 text-red-500">
              {error}
            </div>
          ) : comments.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-10">
              <Image src={ImageComment} alt="comment" className="mb-4" />

              <span className="w-full text-center text-[14px] text-[#6666C6] mt-4">
                نظری برای این مقاله ثبت نشده است .
              </span>
            </div>
          ) : (
            <div
              className="custom-scrollbar overflow-y-auto overflow-x-hidden p-3"
              style={{
                maxHeight: comments.length > 2 ? "200px" : "none",
                direction: "ltr",
              }}
            >
              <div dir="rtl" className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-2xl border border-[#F3F2F2] bg-[#F9F9FB] py-4 px-6"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[16px] leading-7 text-[#3a3a3a]">
                        نام فرد
                      </span>
                      <span className="text-[12px] text-[#999]">
                        {comment.createDate.slice(11, 19)} /{" "}
                        {comment.createDate.slice(0, 10)}
                      </span>
                    </div>
                    <p className="text-[14px] leading-7 text-[#606060] pt-3">
                      {comment.commentText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
