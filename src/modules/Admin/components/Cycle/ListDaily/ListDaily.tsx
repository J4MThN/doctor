"use client";

import { useState } from "react";
import { dailySymptom } from "@/src/modules/Admin/data/users";

interface ListDailyProps {
  id: string;
  cycleId: string;
}

export const ListDaily = ({ cycleId }: ListDailyProps) => {
  const cycleSymptoms = dailySymptom.filter(
    (item) => String(item.cycleId) === cycleId,
  );

  const [selectedDate, setSelectedDate] = useState(
    cycleSymptoms[0]?.date || "",
  );

  const selectedDay = cycleSymptoms.find((item) => item.date === selectedDate);

  return (
    <div className="w-full min-h-0 m-6 flex gap-6">
      <div className="w-112.75 h-95.5 rounded-2xl border border-[#F3F2F2] bg-white p-4">
        <div className="text-[14px] font-bold text-[#606060] mb-4">تقویم</div>

        <div className="w-100.25 h-11 rounded-lg bg-[#FFECEF] flex items-center justify-center mb-4">
          <span className="text-[18px] font-bold text-[#FF657D]">
            {selectedDate}
          </span>
        </div>

        <div className="grid grid-cols-7 text-center mb-3">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
            <span key={day} className="text-[14px] font-normal text-[#4D4D4D]">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-3 text-center">
          {cycleSymptoms.map((item) => {
            const day = item.date.split("/")[2];

            const isSelected = item.date === selectedDate;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedDate(item.date)}
                className={`
                  mx-auto
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[18px]
                  font-bold
                  transition
                  ${
                    isSelected
                      ? "bg-[#FFECEF] text-[#FF657D]"
                      : "text-[#4D4D4D]"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-219.25 h-119.5 rounded-2xl border border-[#F3F2F2] bg-white p-4">
        <div className="flex items-center mb-4">
          <span className="text-[14px] font-bold text-[#606060]">
            علائم روزانه
          </span>

          <span className="text-[10px] text-[#AEAEB2] mr-3">
            {selectedDate}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {selectedDay?.symptoms.map((symptom, index) => (
            <div
              key={index}
              className="w-full h-12 rounded-lg border border-[#F3F2F2] bg-[#FBFBFB] flex items-center px-4"
            >
              <span className="text-[14px] font-normal text-[#4D4D4D]">
                {symptom}
              </span>
            </div>
          ))}
          {!selectedDay && (
            <div className="text-[12px] text-[#AEAEB2]">
              برای این تاریخ علامتی ثبت نشده است.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
