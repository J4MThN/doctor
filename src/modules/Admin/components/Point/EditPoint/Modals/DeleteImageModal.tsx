"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface DeleteImageModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteImageModal({
  onConfirm,
  onCancel,
}: DeleteImageModalProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/20
      "
    >
      <div
        className="
          w-90
          rounded-2xl
          bg-white
          p-6
        "
      >
        <div className="flex justify-end">
          <button type="button" onClick={onCancel}>
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={20}
              strokeWidth={1.5}
              className="text-[#80838D]"
            />
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-[14px] font-bold text-[#4D4D4D]">حذف عکس</p>

          <p className="text-[12px] text-[#80838D] mt-2">
            مطمئنی می‌خواهی این عکس را حذف کنی؟
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onConfirm}
            className="
              w-27.5
              h-9.5
              rounded-lg
              bg-[#FF657D]
              text-white
              text-[12px]
            "
          >
            بله، حذف کن
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
              w-27.5
              h-9.5
              rounded-lg
              border
              border-[#BFC0C5]
              text-[#80838D]
              text-[12px]
            "
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
