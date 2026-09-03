"use client";

import { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toGregorian, jalaaliMonthLength } from "jalaali-js";

interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

const toPersianNumber = (value: number | string) => {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
};

const parseDate = (date: string) => {
  const [year, month, day] = date.split("/").map(Number);
  return { year, month, day };
};

const formatDate = (year: number, month: number, day: number) => {
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
    2,
    "0",
  )}`;
};

const getFirstDay = (year: number, month: number) => {
  const { gy, gm, gd } = toGregorian(year, month, 1);
  const date = new Date(Date.UTC(gy, gm - 1, gd));
  return (date.getUTCDay() + 1) % 7;
};

export default function Calender({
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const initialDate = parseDate(selectedDate);
  const [year, setYear] = useState(initialDate.year);
  const [month, setMonth] = useState(initialDate.month);
  const totalDays = jalaaliMonthLength(year, month);
  const firstDay = getFirstDay(year, month);

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const changeMonth = (direction: number) => {
    if (direction === -1) {
      if (month === 1) {
        setMonth(12);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    }
    if (direction === 1) {
      if (month === 12) {
        setMonth(1);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="w-113 h-100 rounded-2xl border border-[#F3F2F2] bg-white pt-4 pl-6 pr-6 ">
      <div className="text-[14px] font-bold text-[#4D4D4D] mb-4">تقویم</div>
      <div className="border border-[#FFECEF] rounded-[9px]">
        <div className="w-100.25 h-12 rounded-t-lg bg-[#FFECEF] flex items-center justify-between px-3 mb-4">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="text-[#6E6E6E] cursor-pointer"
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={24}
              strokeWidth={1.5}
            />
          </button>
          <span className="text-[18px] font-bold text-[#FF657D]">
            {monthNames[month - 1]} {toPersianNumber(year)}
          </span>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="text-[#6E6E6E] cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center mb-2">
          {weekDays.map((day, index) => (
            <span
              key={day}
              className={`text-[12px] ${index === 6 ? "text-[#E51D1D]" : "text-[#AEAEB2]"}`}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center ">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-9" />;
            }
            const date = formatDate(year, month, day);
            const selected = date === selectedDate;
            const friday = index % 7 === 6;
            return (
              <button
                key={date}
                type="button"
                onClick={() => onSelectDate(date)}
                className={`
                cursor-pointer mx-auto w-9 h-9 rounded-lg flex items-center justify-center text-[18px] font-bold
                ${
                  selected
                    ? "bg-[#FFECEF] text-[#FF657D]"
                    : friday
                      ? "text-[#E51D1D]"
                      : "text-[#4D4D4D]"
                }`}
              >
                {toPersianNumber(day)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
