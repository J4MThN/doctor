"use client";
import { HugeiconsIcon } from "@hugeicons/react";

interface Symptom {
  title: string;
  value: string;
  icon?: any;
}

interface DailySymptomsProps {
  date: string;
  symptoms?: Symptom[];
}

export default function DailySymptoms({ date, symptoms }: DailySymptomsProps) {
  return (
    <div className="w-219.25 h-122 rounded-2xl border border-[#F3F2F2] bg-white p-4">
      <div className="flex items-center mb-4">
        <span className="text-[14px] font-bold text-[#4D4D4D]">
          علائم روزانه شما
        </span>
        <span className="text-[14px] text-[#80838D] mr-3">{date}</span>
      </div>

      <div className="flex flex-col gap-6">
        {symptoms?.map((symptom, index) => {
          return (
            <div
              key={index}
              className="
                w-full
                h-12
                rounded-full
                border
                border-[#F3F2F2]
                bg-[#FBFBFB]
                flex
                items-center
                px-3
              "
            >
              <span
                className="
                w-[50%]
                text-right
                text-[14px]
                font-medium
                text-[#4D4D4D]
              "
              >
                {symptom.title}
              </span>

              <span
                className="
                flex-1
                text-left
                text-[13px]
                text-[#606060]
              "
              >
                {symptom.value}
              </span>
              {symptom.icon && (
                <div
                  className="
                w-8
                h-8
                rounded-full
                bg-[#FF93A3]
                flex
                items-center
                justify-center
                mr-2
              "
                >
                  <HugeiconsIcon
                    icon={symptom.icon}
                    size={18}
                    strokeWidth={2}
                    className="text-white"
                  />
                </div>
              )}
            </div>
          );
        })}

        {!symptoms?.length && (
          <div className="text-[12px] text-[#AEAEB2] pt-2">
            برای این تاریخ علائمی ثبت نشده است.
          </div>
        )}
      </div>
    </div>
  );
}
