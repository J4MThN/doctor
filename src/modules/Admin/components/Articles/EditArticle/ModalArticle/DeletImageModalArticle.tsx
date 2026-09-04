"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface DeleteImageModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeletImageModalArticle({
  onConfirm,
  onCancel,
}: DeleteImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="w-82.5 h-50 rounded-3xl bg-white p-4">
        <div className="flex justify-start">
          <button type="button" onClick={onCancel}>
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={24}
              strokeWidth={1.5}
              className="text-[#FF657D] cursor-pointer"
            />
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-[16px] font-bold text-[#4D4D4D] mt-2">
            آیا میخواهید این عکس را حذف کنید؟
          </p>
        </div>
        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className=" w-26 h-10 rounded-lg border border-[#80838D] text-[#80838D] text-[14px] cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className=" w-26 h-10 rounded-lg bg-[#FF657D] text-white text-[14px] cursor-pointer"
          >
           بله
          </button>
        </div>
      </div>
    </div>
  );
}
