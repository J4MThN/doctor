"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";

interface IconOption {
  id: string;
  name: string;
  icon: any;
}

interface IconSelectModalProps {
  currentIcon: any;
  icons: IconOption[];
  selectedIcon: IconOption | null;
  onSelect: (icon: IconOption) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function IconSelectModal({
  currentIcon,
  icons,
  selectedIcon,
  onSelect,
  onConfirm,
  onCancel,
}: IconSelectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div dir="rtl" className="w-120 rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[16px] font-bold text-[#4D4D4D]">
            انتخاب آیکون
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={20}
              color="#606060"
              strokeWidth={1.5}
            />
          </button>
        </div>

        <div className="mb-5">
          <span className="block mb-2 text-[12px] text-[#606060]">
            آیکون فعلی
          </span>
          <div className="w-full flex items-center justify-center">
            <div className="w-80 h-30 rounded-xl border border-[#F3F2F2] bg-[#F9F9FB] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image
                  src={selectedIcon?.icon ?? currentIcon}
                  alt="Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 mt-4">
          <span className="block mb-3 text-[12px] text-[#606060]">
            تغییر آیکون
          </span>
          <div className="grid grid-cols-5 gap-6">
            {icons.map((item) => {
              const isSelected = selectedIcon?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  className={`
                    relative w-17 h-17 rounded-xl flex items-center justify-center cursor-pointer border
                    ${
                      isSelected
                        ? "border-[#6666C6] bg-[#F2F2FF]"
                        : "border-[#F3F2F2] bg-[#FBFBFB]"
                    }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#6666c6] flex items-center justify-center">
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={14}
                        color="white"
                        strokeWidth={2}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="
              w-28 h-11 rounded-lg border border-[#80838D] bg-white text-[#80838D] text-[14px] cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selectedIcon}
            className="
              w-28 h-11 rounded-lg bg-[#FF657D] text-white text-[14px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}
