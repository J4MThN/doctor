"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Spin } from "antd";
import { CommentResponseDto } from "../../../types/comment.types";

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
      <div dir="rtl" className="w-150 rounded-3xl bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-bold text-[#6666C6]">
            نظرات مقاله{" "}
            <span className="text-[14px] font-bold text-[#808080] mr-2">
              ({articleTitle})
            </span>{" "}
          </h2>

          <button type="button" onClick={onClose} className="cursor-pointer">
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={24}
              strokeWidth={2}
              className="text-[#FF657D]"
            />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : error ? (
          <div className="flex justify-center py-10 text-red-500">{error}</div>
        ) : comments.length === 0 ? (
          <div className="flex justify-center py-10 text-[14px] text-[#6666C6]">
            نظری برای این مقاله ثبت نشده است .
          </div>
        ) : (
          <div
            className="custom-scrollbar overflow-y-auto overflow-x-hidden"
            style={{
              maxHeight: comments.length > 2 ? "200px" : "none",
              direction: "ltr",
            }}
          >
            <div dir="rtl" className="space-y-4 pr-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-2xl border border-[#F3F2F2] bg-[#F9F9FB] p-4"
                >
                  <p className="text-[14px] leading-7 text-[#606060]">
                    {comment.commentText}
                  </p>

                  <div className="mt-2 text-[12px] text-[#999] text-left">
                    {comment.createDate.slice(0, 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
