
export interface QuestionOptionDto {
  id: number;
  text: string;
}

export interface QuestionDto {
  id: number;
  text: string;
  options: QuestionOptionDto[];
}