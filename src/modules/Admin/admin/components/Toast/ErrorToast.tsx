"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

interface ErrorToastProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ErrorToast({
  open,
  title = "خطا در دریافت اطلاعات",
  message,
  onClose,
}: ErrorToastProps) {
  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="
        fixed top-4 right-4 z-9999 w-90 min-h-22 overflow-hidden rounded-lg border border-[#E5E5EA] bg-white shadow-[0_0px_35px_rgba(0,0,0,0.12)] animate-[toastIn_0.3s_ease-out]
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-[#FF657D]" />

      <div className="flex items-start gap-3 p-4 pr-5">
        <div
          className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF1F3]">
          <HugeiconsIcon
            icon={Alert02Icon}
            size={21}
            strokeWidth={1.8}
            className="text-[#FF657D]"
          />
        </div>
        <div className="flex-1 pt-0.5">
          <p className="text-[14px] font-bold text-[#4D4D4D]">
            {title}
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[#80838D]">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className=" flex h-6 w-6 items-center justify-center cursor-pointer rounded-full text-[#AEAEB2] transition hover:bg-[#FFF1F3] hover:text-[#FF657D]"
        >
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={17}
            strokeWidth={1.7}
          />
        </button>
      </div>
    </div>
  );
}