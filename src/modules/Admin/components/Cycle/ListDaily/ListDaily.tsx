"use client";

import { useState } from "react";

import { dailySymptom } from "@/src/modules/Admin/data/users";
import { cycle , user } from "@/src/modules/Admin/data/users";
import Calender from "./Calender";
import DailySymptoms from "./DailySymptoms";

interface ListDailyProps {
  id: string;
  cycleId: string;
}

export const ListDaily = ({ cycleId }: ListDailyProps) => {
  
  const selectedCycle = cycle.find(
    (item) => String(item.key) === String(cycleId),
  );

  const cycleSymptoms = dailySymptom.filter(
    (item) => String(item.cycleId) === String(cycleId),
  );

  const initialDate =
    selectedCycle?.date || cycleSymptoms[0]?.date || "1405/01/01";

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const selectedDay = cycleSymptoms.find((item) => item.date === selectedDate);

  return (
    <div dir="rtl" className="w-full min-h-0 m-6 flex gap-6">
      <Calender selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <DailySymptoms date={selectedDate} symptoms={selectedDay?.symptoms} />
    </div>
  );
};
