export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export class CreateQuestionDto {
  type: QuestionType;
  text: string;
  options?: string[];
  order?: number;
}

export class CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
