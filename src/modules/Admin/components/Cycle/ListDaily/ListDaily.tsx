"use client";

import { useState } from "react";
import { dailySymptom } from "@/src/modules/Admin/data/users";

interface EditeProps {
  id: string;
}

export const ListDaily = ({ id }: EditeProps) => {
  const selectCycle = dailySymptom.find(
    (item) => String(item.key) === id
  );

  const [selectedDate, setSelectedDate] = useState(
    selectCycle?.date || ""
  );

  return (
    <div className="w-full min-h-0 m-6 flex gap-4">

      {/* باکس علائم روزانه - سمت چپ */}
      <div className="flex-1 rounded-2xl border border-[#F3F2F2] bg-white p-4">

        <div className="flex items-center mb-4">
          <span className="text-[14px] font-bold text-[#606060]">
            علائم روزانه
          </span>

          <span className="text-[10px] text-[#AEAEB2] mr-3">
            {selectedDate}
          </span>
        </div>

        <div className="flex flex-col gap-2">

          {selectCycle?.symptoms?.map((symptom , index) => (
              <div
                key={index}
                className="w-full h-12 rounded-lg border border-[#F3F2F2] bg-[#FBFBFB] flex items-center px-4"
              >
                <span className="text-[14px] font-normal text-[#4D4D4D]">
                  {symptom}
                </span>
              </div>
            )
          )}

        </div>
      </div>


      {/* باکس تقویم - سمت راست */}
      <div className="w-112.75 h-95.5 rounded-2xl border border-[#F3F2F2] bg-white p-4">

        <div className="text-[14px] font-bold text-[#606060] mb-4">
          تقویم
        </div>

        {/* تاریخ انتخاب شده */}
        <div className="w-full h-11 rounded-lg bg-[#FFECEF] flex items-center justify-center mb-4">
          <span className="text-[18px] font-bold text-[#FF657D]">
            {selectedDate}
          </span>
        </div>

        {/* روزهای تقویم */}
        <div className="grid grid-cols-7 text-center mb-3">

          {[
            "ش",
            "ی",
            "د",
            "س",
            "چ",
            "پ",
            "ج",
          ].map((day) => (
            <span
              key={day}
              className="text-[14px] text-[#4D4D4D]"
            >
              {day}
            </span>
          ))}

        </div>

        <div className="grid grid-cols-7 gap-y-3 text-center">

          {Array.from({ length: 30 }, (_, index) => {
            const day = index + 1;
            const date = String(day);

            const isSelected = selectedDate === date;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`mx-auto w-9 h-9 rounded-lg text-[18px] font-bold ${
                  isSelected
                    ? "bg-[#FFECEF] text-[#FF657D]"
                    : "text-[#4D4D4D]"
                }`}
              >
                {day}
              </button>
            );
          })}
</div>
        </div>
      </div>
  );
};