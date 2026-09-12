import { z } from 'zod';

const questionSchema = z.object({
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.object({ value: z.string() })).optional(),
});

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type CreateQuizFormValues = z.infer<typeof createQuizSchema>;
