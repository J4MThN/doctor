"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

interface SuccessToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function SuccessToast({
  open,
  message,
  onClose,
}: SuccessToastProps) {
  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="
        fixed top-6 left-1/2 -translate-x-1/2 z-9999 w-90 min-h-22
        overflow-hidden rounded-2xl border border-[#E5E5EA] bg-white
        shadow-[0_10px_35px_rgba(0,0,0,0.12)] animate-[toastIn_0.3s_ease-out]"
    >
      <div className="absolute bottom-0 right-0 h-1 w-full bg-[#39DAD5]" />

      <div className="flex items-start gap-3 p-4 pr-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7FFFE]">
          <HugeiconsIcon
            icon={Tick02Icon}
            size={21}
            strokeWidth={1.8}
            className="text-[#39DAD5]"
          />
        </div>
        <div className="flex-1 pt-1">
          <p className="text-[14px] font-bold text-[#4D4D4D]">
            ثبت با موفقیت انجام شد
          </p>

          <p className="mt-1 text-[12px] leading-5 text-[#80838D]">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className=" flex h-6 w-6 items-center justify-center rounded-full text-[#AEAEB2] transition hover:bg-[#E7FFFE] hover:text-[#39DAD5]"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={17} strokeWidth={1.7} />
        </button>
      </div>
    </div>
  );
}
