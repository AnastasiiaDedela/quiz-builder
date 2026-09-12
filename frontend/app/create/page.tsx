'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizFormValues } from './schema';
import { quizApi } from '@/services/api';
import QuestionCard from '@/components/QuestionCard';

export default function CreateQuizPage() {
  const router = useRouter();

  const methods = useForm<CreateQuizFormValues>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [{ type: 'BOOLEAN', text: '', options: [] }],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const onSubmit = async (values: CreateQuizFormValues) => {
    await quizApi.create({
      title: values.title,
      questions: values.questions.map((q, i) => ({
        type: q.type,
        text: q.text,
        order: i,
        options:
          q.type === 'CHECKBOX'
            ? (q.options ?? []).map((o) => o.value).filter(Boolean)
            : undefined,
      })),
    });
    router.push('/quizzes');
  };

  return (
    <main className="flex-1 py-8 px-4">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: 'var(--text)' }}>
            Create a new quiz.
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--muted)' }}>
            Add a title, build your questions, and submit.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div
              className="rounded-2xl p-4 sm:p-5 shadow-sm"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                Quiz Title
              </label>
              <input
                {...register('title')}
                placeholder="e.g. World Geography Basics"
                className="w-full rounded-xl px-4 py-3 text-base font-medium outline-none transition-all"
                style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              {errors.title && (
                <p className="mt-2 text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {fields.map((field, index) => (
              <QuestionCard key={field.id} index={index} onRemove={() => remove(index)} />
            ))}

            {errors.questions?.root && (
              <p className="text-xs text-red-500">{errors.questions.root.message}</p>
            )}

            <button
              type="button"
              onClick={() => append({ type: 'BOOLEAN', text: '', options: [] })}
              className="w-full rounded-2xl py-3.5 text-sm font-semibold transition-all mx-px"
              style={{ border: '1.5px dashed var(--primary)', color: 'var(--primary)', background: 'transparent' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#5b4fcf12')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
            >
              + Add Question
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl py-4 text-sm font-bold text-white transition-all disabled:opacity-50"
              style={{ background: 'var(--primary)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-hover)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'var(--primary)')}
            >
              {isSubmitting ? 'Creating...' : 'Create Quiz →'}
            </button>

          </form>
        </FormProvider>
      </div>
    </main>
  );
}
