import axios from 'axios';
import type { Quiz, QuizSummary, CreateQuizDto } from '@/types/quiz';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

export const quizApi = {
  getAll: () => api.get<QuizSummary[]>('/quizzes').then((r) => r.data),
  getOne: (id: number) => api.get<Quiz>(`/quizzes/${id}`).then((r) => r.data),
  create: (dto: CreateQuizDto) => api.post<Quiz>('/quizzes', dto).then((r) => r.data),
  remove: (id: number) => api.delete(`/quizzes/${id}`).then((r) => r.data),
};
