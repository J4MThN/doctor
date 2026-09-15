"use client";

import { useEffect, useState } from "react";

import Calender from "./Calender";
import DailySymptoms from "./DailySymptoms";
import { useDailySymptoms } from "../../../hook/useDailySymptoms";
import { useCyclesByUserId } from "../../../hook/useCyclesByUserId";
import { useQuestions } from "../../../hook/useQuestions";

interface ListDailyProps {
  id: string;
  cycleId: string;
}

export const ListDaily = ({ id, cycleId }: ListDailyProps) => {
  const {
    symptoms,
    loading: symptomsLoading,
    error: symptomsError,
  } = useDailySymptoms(cycleId);

  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
  } = useQuestions();

  const { cycles } = useCyclesByUserId(id);

  const selectedCycle = cycles.find(
    (item) => String(item.id) === String(cycleId),
  );

  const initialDate = selectedCycle?.startDate || "1405/01/01";

  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (selectedCycle?.startDate) {
      setSelectedDate(selectedCycle.startDate);
    }
  }, [selectedCycle]);

  const getCycleDay = () => {
    if (!selectedCycle?.startDate) return null;

    const [startYear, startMonth, startDay] = selectedCycle.startDate
      .split("/")
      .map(Number);

    const [selectedYear, selectedMonth, selectedDay] = selectedDate
      .split("/")
      .map(Number);

    const startTotalDays = startYear * 365 + startMonth * 30 + startDay;

    const selectedTotalDays =
      selectedYear * 365 + selectedMonth * 30 + selectedDay;

    return selectedTotalDays - startTotalDays + 1;
  };

  const selectedCycleDay = getCycleDay();

  const selectedDaySymptoms = symptoms.filter(
    (item) => item.cycleDay === selectedCycleDay,
  );

  const formattedSymptoms = selectedDaySymptoms.map((symptom) => {
    const question = questions.find((item) => item.id === symptom.questionId);

    const answer = question?.options.find(
      (option) => option.id === symptom.answerId,
    );

    return {
      title: question?.text ?? "-",
      value: answer?.text ?? "-",
    };
  });

  return (
    <div dir="rtl" className="w-full min-h-0 m-6 flex gap-6">
      <Calender selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <DailySymptoms date={selectedDate} symptoms={formattedSymptoms} />
    </div>
  );
};
