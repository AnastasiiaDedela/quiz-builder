export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Question {
  id: number;
  quizId: number;
  type: QuestionType;
  text: string;
  options: string[] | null;
  order: number;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: Question[];
}

export interface QuizSummary {
  id: number;
  title: string;
  createdAt: string;
  _count: { questions: number };
}

export interface CreateQuestionDto {
  type: QuestionType;
  text: string;
  options?: string[];
  order?: number;
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
