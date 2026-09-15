export interface DailySymptomDto {
  id: number;
  userId: number;
  cycleId: number;
  questionId: number;
  answerId: number;
  cycleDay: number;
  createDate: string;
}

export interface CreateDailySymptomRequestDto {
  cycleId: number;
  questionId: number;
  answerId: number;
  cycleDay: number;
}